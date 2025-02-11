import { CatalogType } from '#base/api';
import { useEventListener } from '#base/hooks';
import { useVisibilityStore } from '#base/stores';
import { GetCommunication, RoomSessionEvent } from '@nitrodevco/nitro-renderer';
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

    useEventListener<RoomSessionEvent>(RoomSessionEvent.CREATED, event => useVisibilityStore.setState({ landingViewVisible: false }));
    useEventListener<RoomSessionEvent>(RoomSessionEvent.ENDED, event => useVisibilityStore.setState({ landingViewVisible: event.openLandingView }));

    useEffect(() =>
    {
        GetCommunication().connection.ready();
    }, []);

    return (
        <>
            <AnimatePresence>
                {landingViewVisible &&
                    <motion.div
                        key="hotel-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <HotelView />
                    </motion.div>}
            </AnimatePresence>
            <RoomView />
            {navigationVisible && <NavigatorView />}
            {inventoryVisible && <InventoryView />}
            {catalogVisible && <CatalogView catalogType={CatalogType.NORMAL} />}
            <ToolbarView isInRoom={!landingViewVisible} />
            <div className="absolute top-[0] right-[10px] min-w-[200px] max-w-[200px] h-[calc(100%-55px)] pointer-events-none">
                <div className="flex flex-col size-full relative">
                    <WalletView />
                </div>
            </div>
        </>
    );
};
