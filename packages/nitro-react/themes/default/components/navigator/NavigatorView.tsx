import { SendMessageComposer } from '#base/api';
import { useEventListener, useLocalization } from '#base/hooks';
import { useNavigatorStore, useVisibilityStore } from '#base/stores';
import { NitroCard } from '#themes/default';
import { ConvertGlobalRoomIdMessageComposer, HabboWebTools, LegacyExternalInterface, NavigatorInitComposer, NavigatorSearchComposer, RoomSessionEvent } from '@nitrodevco/nitro-renderer';
import { FC, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/shallow';

export const NavigatorView: FC = () =>
{
    const isVisible = useVisibilityStore(state => state.navigationVisible);
    const [
        topLevelContext,
        topLevelContexts,
        searchResult,
        isReady,
        isLoading,
        isCreatorOpen,
        needsInit,
        needsSearch,
        pendingResult
    ] = useNavigatorStore(
        useShallow(state => [
            state.topLevelContext,
            state.topLevelContexts,
            state.searchResult,
            state.isReady,
            state.isLoading,
            state.isCreatorOpen,
            state.needsInit,
            state.needsSearch,
            state.pendingResult,
        ]));
    const translation = useLocalization();

    const pendingSearch = useRef<{ data: string, code: string }>(null);
    const elementRef = useRef<HTMLDivElement>(null);

    const sendSearch = (searchValue: string, contextCode: string) =>
    {
        useNavigatorStore.setState(state => ({ ...state, isCreatorOpen: false, pendingResult: true }));
        SendMessageComposer(new NavigatorSearchComposer(contextCode, searchValue));
    };

    useEventListener<RoomSessionEvent>(RoomSessionEvent.CREATED, event =>
    {
        useNavigatorStore.setState(state => ({ ...state, isCreatorOpen: false }));
        useVisibilityStore.setState({ navigationVisible: false });
    });

    useEffect(() =>
    {
        if (searchResult)
        {
            useNavigatorStore.setState(state => ({ ...state, isLoading: false }));
            elementRef.current?.scrollTo(0, 0);
        }
    }, [searchResult]);

    useEffect(() =>
    {
        if (isVisible && needsSearch)
        {
            const reloadCurrentSearch = () =>
            {
                if (!isReady)
                {
                    useNavigatorStore.setState(state => ({ ...state, needsSearch: true }));

                    return;
                }

                const search = pendingSearch.current ?? searchResult;

                if (search) sendSearch(search.data, search.code);
                else if (topLevelContext) sendSearch('', topLevelContext.code);
            };

            reloadCurrentSearch();
            useNavigatorStore.setState(state => ({ ...state, needsSearch: false }));
        }
    }, [isVisible, topLevelContext, searchResult, needsSearch, isReady]);

    useEffect(() =>
    {
        if (!isReady && topLevelContext) useNavigatorStore.setState(state => ({ ...state, isReady: true }));
    }, [isReady, topLevelContext]);

    useEffect(() =>
    {
        if (isVisible && needsInit)
        {
            SendMessageComposer(new NavigatorInitComposer());
            useNavigatorStore.setState(state => ({ ...state, needsInit: false }));
        }
    }, [isVisible, needsInit]);

    useEffect(() =>
    {
        LegacyExternalInterface.addCallback(HabboWebTools.OPENROOM, (k: string, _arg_2: boolean = false, _arg_3: string = null) => SendMessageComposer(new ConvertGlobalRoomIdMessageComposer(k)));
    }, []);

    return (
        <>
            {isVisible &&
                <NitroCard
                    className="h-navigator-h min-h-navigator-h w-navigator-w min-w-navigator-w"
                    uniqueKey="navigator">
                    <NitroCard.Header
                        headerText={translation(isCreatorOpen ? 'navigator.createroom.title' : 'navigator.title')}
                        onCloseClick={event => useVisibilityStore.setState({ navigationVisible: false })} />
                    <NitroCard.Tabs>
                        {topLevelContexts && (topLevelContexts.length > 0) && topLevelContexts.map((context, index) =>
                        {
                            return (
                                <NitroCard.TabItem
                                    key={index}
                                    isActive={((topLevelContext === context) && !isCreatorOpen)}
                                    onClick={event => sendSearch('', context.code)}>
                                    {translation(('navigator.toplevelview.' + context.code))}
                                </NitroCard.TabItem>
                            );
                        })}
                        <NitroCard.TabItem
                            isActive={isCreatorOpen}
                        //onClick={ event => setCreatorOpen(true) }
                        >
                            + icon
                        </NitroCard.TabItem>
                    </NitroCard.Tabs>
                    <NitroCard.Content isLoading={isLoading}>
                        {/* { !isCreatorOpen &&
                            <>
                                <NavigatorSearchView sendSearch={ sendSearch } />
                                <div ref={ elementRef } className="flex flex-col gap-2 overflow-auto">
                                    { (searchResult && searchResult.results.map((result, index) => <NavigatorSearchResultView key={ index } searchResult={ result } />)) }
                                </div>
                            </> }
                        { isCreatorOpen && <NavigatorRoomCreatorView /> } */}
                    </NitroCard.Content>
                </NitroCard>}
            {/* <NavigatorDoorStateView />
            { isRoomInfoOpen && <NavigatorRoomInfoView onCloseClick={ () => setRoomInfoOpen(false) } /> }
            { isRoomLinkOpen && <NavigatorRoomLinkView onCloseClick={ () => setRoomLinkOpen(false) } /> }
            <NavigatorRoomSettingsView /> */}
        </>
    );
};
