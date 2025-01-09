import { HotelView, NavigatorView, RoomView, ToolbarView } from '#base/components';
import { useNitroEvent } from '#base/hooks';
import { AddLinkEventTracker, GetCommunication, HabboWebTools, ILinkEventTracker, RemoveLinkEventTracker, RoomSessionEvent } from '@nitrots/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useState } from 'react';

export const Main: FC = () =>
{
    const [ isReady, setIsReady ] = useState(false);
    const [ landingViewVisible, setLandingViewVisible ] = useState(true);

    useNitroEvent<RoomSessionEvent>(RoomSessionEvent.CREATED, event => setLandingViewVisible(false));
    useNitroEvent<RoomSessionEvent>(RoomSessionEvent.ENDED, event => setLandingViewVisible(event.openLandingView));

    useEffect(() =>
    {
        setIsReady(true);
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
            <ToolbarView />
        </>
    );
};
