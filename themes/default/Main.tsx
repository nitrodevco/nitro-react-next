import { useInventoryMessages, useNavigatorMessages, useNitroEvent, useRoomMessages } from '#base/hooks';
import { useVisibilityStore } from '#base/stores';
import { AddLinkEventTracker, GetCommunication, HabboWebTools, ILinkEventTracker, RemoveLinkEventTracker, RoomSessionEvent } from '@nitrots/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { HotelView, InventoryView, NavigatorView, RoomView, ToolbarView } from './components';

export const Main: FC = () =>
{
    const [
        landingViewVisible,
        navigationVisible,
        inventoryVisible
    ] = useVisibilityStore(
        useShallow(state => [
            state.landingViewVisible,
            state.navigationVisible,
            state.inventoryVisible,
        ]));

    useNitroEvent<RoomSessionEvent>(RoomSessionEvent.CREATED, event => useVisibilityStore.setState({ landingViewVisible: false }));
    useNitroEvent<RoomSessionEvent>(RoomSessionEvent.ENDED, event => useVisibilityStore.setState({ landingViewVisible: event.openLandingView }));

    useInventoryMessages();
    useNavigatorMessages();
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
            <NavigatorView />
            { inventoryVisible && <InventoryView /> }
            <ToolbarView isInRoom={ !landingViewVisible } />
        </>
    );
};
