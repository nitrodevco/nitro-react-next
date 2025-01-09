import { DoorStateType, INavigatorData } from '#base/api';
import { NavigatorCategoryDataParser, NavigatorEventCategoryDataParser, NavigatorSearchResultSet, NavigatorTopLevelContext, RoomDataParser } from '@nitrots/nitro-renderer';
import { create } from 'zustand';

interface IDoorData
{
    roomInfo: RoomDataParser;
    state: number;
}

interface NavigatorSlice
{
    categories: NavigatorCategoryDataParser[];
    eventCategories: NavigatorEventCategoryDataParser[];
    topLevelContext: NavigatorTopLevelContext;
    topLevelContexts: NavigatorTopLevelContext[];
    doorData: { roomInfo: RoomDataParser, state: number };
    searchResult: NavigatorSearchResultSet;
    navigatorData: INavigatorData;
    setCategories: (categories: NavigatorCategoryDataParser[]) => void;
    setEventCategories: (eventCategories: NavigatorEventCategoryDataParser[]) => void;
    setTopLevelContext: (topLevelContext: NavigatorTopLevelContext) => void;
    setTopLevelContextByCode: (code: string) => void;
    setTopLevelContexts: (topLevelContexts: NavigatorTopLevelContext[]) => void;
    setDoorData: (doorData: Partial<IDoorData>) => void;
    setSearchResult: (searchResult: NavigatorSearchResultSet) => void;
    setNavigatorData: (navigatorData: Partial<INavigatorData>) => void;
}

export const useNavigatorStore = create<NavigatorSlice>(set => ({
    categories: null,
    eventCategories: null,
    topLevelContext: null,
    topLevelContexts: null,
    doorData: {
        roomInfo: null,
        state: DoorStateType.NONE
    },
    searchResult: null,
    navigatorData: {
        settingsReceived: false,
        homeRoomId: 0,
        enteredGuestRoom: null,
        currentRoomOwner: false,
        currentRoomId: 0,
        currentRoomIsStaffPick: false,
        avatarId: 0,
        roomPicker: false,
        eventMod: false,
        currentRoomRating: 0,
        canRate: true
    },
    setCategories: (categories: NavigatorCategoryDataParser[]) => set({ categories }),
    setEventCategories: (eventCategories: NavigatorEventCategoryDataParser[]) => set({ eventCategories }),
    setTopLevelContext: (topLevelContext: NavigatorTopLevelContext) => set({ topLevelContext }),
    setTopLevelContextByCode: (code: string) => set(state =>
    {
        const topLevelContexts = state.topLevelContexts;
        let newContext: NavigatorTopLevelContext = state.topLevelContext;

        if (!newContext) newContext = ((topLevelContexts && topLevelContexts.length && topLevelContexts[0]) || null);

        if (newContext)
        {
            if ((code !== newContext.code) && topLevelContexts && topLevelContexts.length)
            {
                for (const context of topLevelContexts)
                {
                    if (context.code !== code) continue;

                    newContext = context;
                }
            }
            else
            {
                for (const context of topLevelContexts)
                {
                    if (context.code !== code) continue;

                    newContext = context;
                }
            }
        }

        return (
            { topLevelContext: newContext }
        );
    }),
    setTopLevelContexts: (topLevelContexts: NavigatorTopLevelContext[]) => set({ topLevelContexts }),
    setDoorData: (doorData: Partial<IDoorData>) => set(state => ({ doorData: { ...state.doorData, ...doorData } })),
    setSearchResult: (searchResult: NavigatorSearchResultSet) => set({ searchResult }),
    setNavigatorData: (navigatorData: Partial<INavigatorData>) => set(state => ({ navigatorData: { ...state.navigatorData, ...navigatorData } })),
}));
