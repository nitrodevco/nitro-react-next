import { SendMessageComposer } from '#base/api/index.ts';
import { PetRespectComposer, SetCurrentUserId, UserInfoDataParser, UserRespectComposer } from '@nitrots/nitro-renderer';
import { create } from 'zustand';

type State = {
    userId: number;
    name: string;
    figure: string;
    gender: string;
    realName: string;
    respectsReceived: number;
    respectsLeft: number;
    respectsPetLeft: number;
    tags: string[];
    canChangeName: boolean;
    safetyLocked: boolean;
    clubLevel: number;
    securityLevel: number;
    isAmbassador: boolean;
    noobnessLevel: number;
    isEmailVerified: boolean;
}

type Actions = {
    processUserInfo: (userInfo: UserInfoDataParser) => void;
    setName: (name?: string, canChangeName?: boolean) => void;
    updateFigure: (figure: string, gender: string) => void;
    setSafetyLock: (safetyLocked: boolean) => void;
    updatePermissions: (clubLevel: number, securityLevel: number, isAmbassador: boolean) => void;
    setNoobnessLevel: (noobnessLevel: number) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
    giveRespect: (userId: number) => void;
    givePetRespect: (petId: number) => void;
    setEmailVerified: (isEmailVerified: boolean) => void;
    setTags: (tags: string[]) => void;
}

const initialState: State = {
    userId: null,
    name: null,
    figure: null,
    gender: null,
    realName: null,
    respectsReceived: 0,
    respectsLeft: 0,
    respectsPetLeft: 0,
    tags: [],
    canChangeName: false,
    safetyLocked: false,
    clubLevel: 0,
    securityLevel: 0,
    isAmbassador: false,
    noobnessLevel: -1,
    isEmailVerified: false,
};

export const useSessionStore = create<State & Actions>(set => ({
    ...initialState,
    processUserInfo: (userInfo: UserInfoDataParser) => set(state =>
    {
        SetCurrentUserId(userInfo.userId);

        return {
            userId: userInfo.userId,
            name: userInfo.username,
            figure: userInfo.figure,
            gender: userInfo.gender,
            realName: userInfo.realName,
            respectsReceived: userInfo.respectsReceived,
            respectsLeft: userInfo.respectsRemaining,
            respectsPetLeft: userInfo.respectsPetRemaining,
            canChangeName: userInfo.canChangeName,
            safetyLocked: userInfo.safetyLocked
        };
    }),
    setName: (name: string = undefined, canChangeName: boolean = undefined) => set(state =>
    {
        const newState = {
            name: state.name,
            canChangeName: state.canChangeName
        };

        if (name !== undefined) newState.name = name;
        if (canChangeName !== undefined) newState.canChangeName = canChangeName;

        return newState;
    }),
    updateFigure: (figure: string, gender: string) => set({ figure, gender }),
    setSafetyLock: (safetyLocked: boolean) => set({ safetyLocked }),
    updatePermissions: (clubLevel: number, securityLevel: number, isAmbassador: boolean) => set({ clubLevel, securityLevel, isAmbassador }),
    setNoobnessLevel: (noobnessLevel: number) => set({ noobnessLevel }),
    increasePetRespects: () => set(state => ({ respectsPetLeft: (state.respectsPetLeft + 1) })),
    decreasePetRespects: () => set(state => ({ respectsPetLeft: (state.respectsPetLeft - 1) })),
    giveRespect: (userId: number) => set(state =>
    {
        if ((userId < 0) || (state.respectsLeft <= 0)) return state;

        SendMessageComposer(new UserRespectComposer(userId));

        return { respectsLeft: (state.respectsLeft - 1) };
    }),
    givePetRespect: (petId: number) => set(state =>
    {
        if ((petId < 0) || (state.respectsPetLeft <= 0)) return state;

        SendMessageComposer(new PetRespectComposer(petId));

        return { respectsPetLeft: (state.respectsPetLeft - 1) };
    }),
    setEmailVerified: (isEmailVerified: boolean) => set({ isEmailVerified }),
    setTags: (tags: string[]) => set({ tags })
}));
