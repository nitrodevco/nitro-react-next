import { CatalogType } from '#base/api';
import { useCatalogMessages, useInventoryMessages, useNavigatorMessages, useNitroEvent, useRoomMessages, useSessionMessages, useWalletMessages } from '#base/hooks';
import { useVisibilityStore } from '#base/stores';
import { AddLinkEventTracker, GetCommunication, HabboWebTools, ILinkEventTracker, RemoveLinkEventTracker, RoomSessionEvent } from '@nitrots/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { CatalogView, HotelView, InventoryView, NavigatorView, RoomView, ToolbarView, WalletView } from './components';
import './index.css';

export const Main: FC = () =>
{
    const [
        landingViewVisible,
        navigationVisible,
        inventoryVisible,
        catalogVisible
    ] = useVisibilityStore(
    useShallow(state => [
        state.landingViewVisible,
        state.navigationVisible,
        state.inventoryVisible,
        state.catalogVisible
    ]));

    useNitroEvent<RoomSessionEvent>(RoomSessionEvent.CREATED, event => useVisibilityStore.setState({ landingViewVisible: false }));
    useNitroEvent<RoomSessionEvent>(RoomSessionEvent.ENDED, event => useVisibilityStore.setState({ landingViewVisible: event.openLandingView }));

    useSessionMessages();
    useInventoryMessages();
    useNavigatorMessages();
    useCatalogMessages();
    useWalletMessages();
    useRoomMessages();

    useEffect(() =>
    {
        GetCommunication().connection.ready();
    }, []);

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');

                if(parts.length < 2) return;

                switch(parts[1])
                {
                    case 'open':
                        if(parts.length > 2)
                        {
                            switch(parts[2])
                            {
                                case 'credits':
                                    //HabboWebTools.openWebPageAndMinimizeClient(this._windowManager.getProperty(ExternalVariables.WEB_SHOP_RELATIVE_URL));
                                    break;
                                default: {
                                    const name = parts[2];
                                    HabboWebTools.openHabblet(name);
                                }
                            }
                        }
                        return;
                }
            },
            eventUrlPrefix: 'habblet/'
        };

        AddLinkEventTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    return (
        <>
            <AnimatePresence>
                { landingViewVisible &&
                    <motion.div
                        key="hotel-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <HotelView />
                    </motion.div> }
            </AnimatePresence>
            <RoomView />
            { navigationVisible && <NavigatorView /> }
            { inventoryVisible && <InventoryView /> }
            { catalogVisible && <CatalogView catalogType={ CatalogType.NORMAL } />}
            <ToolbarView isInRoom={ !landingViewVisible } />
            <div className="absolute top-[0] right-[10px] min-w-[200px] max-w-[200px] h-[calc(100%-55px)] pointer-events-none">
                <div className="flex flex-col size-full relative">
                    <WalletView />
                </div>
            </div>
        </>
    );
};
