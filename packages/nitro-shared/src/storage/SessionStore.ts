import { createStore } from 'zustand';

type UserInfo = {
    userId: number;
    name: string;
    figure: string;
    gender: string;
    realName: string;
    respectsReceived: number;
    respectsRemaining: number;
    respectsPetRemaining: number;
    canChangeName: boolean;
    safetyLocked: boolean;
}

type State = {
    tags: string[];
    clubLevel: number;
    securityLevel: number;
    isAmbassador: boolean;
    noobnessLevel: number;
    isEmailVerified: boolean;
} & UserInfo;

type Actions = {
    processUserInfo: (userInfo: UserInfo) => void;
    setName: (name?: string, canChangeName?: boolean) => void;
    updateFigure: (figure: string, gender: string) => void;
    setSafetyLock: (safetyLocked: boolean) => void;
    updatePermissions: (clubLevel: number, securityLevel: number, isAmbassador: boolean) => void;
    setNoobnessLevel: (noobnessLevel: number) => void;
    increasePetRespects: () => void;
    decreasePetRespects: () => void;
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
    respectsRemaining: 0,
    respectsPetRemaining: 0,
    tags: [],
    canChangeName: false,
    safetyLocked: false,
    clubLevel: 0,
    securityLevel: 0,
    isAmbassador: false,
    noobnessLevel: -1,
    isEmailVerified: false,
};

export const SessionStore = createStore<State & Actions>(set => ({
    ...initialState,
    processUserInfo: (userInfo: UserInfo) => set(state =>
    {
        return {
            userId: userInfo.userId,
            name: userInfo.name,
            figure: userInfo.figure,
            gender: userInfo.gender,
            realName: userInfo.realName,
            respectsReceived: userInfo.respectsReceived,
            respectsRemaining: userInfo.respectsRemaining,
            respectsPetRemaining: userInfo.respectsPetRemaining,
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
    increasePetRespects: () => set(state => ({ respectsPetRemaining: (state.respectsPetRemaining + 1) })),
    decreasePetRespects: () => set(state => ({ respectsPetRemaining: (state.respectsPetRemaining - 1) })),
    setEmailVerified: (isEmailVerified: boolean) => set({ isEmailVerified }),
    setTags: (tags: string[]) => set({ tags })
}));
