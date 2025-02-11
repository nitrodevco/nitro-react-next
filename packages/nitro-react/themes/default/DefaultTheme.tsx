import { useCatalogMessages, useInventoryMessages, useNavigatorMessages, useRoomMessages, useSessionMessages, useWalletMessages } from '#base/hooks';
import { AddLinkEventTracker, HabboWebTools, ILinkEventTracker, RemoveLinkEventTracker } from '@nitrodevco/nitro-renderer';
import { FC, useEffect } from 'react';
import { Main } from './Main';

export const DefaultTheme: FC = () =>
{
    useSessionMessages();
    useInventoryMessages();
    useNavigatorMessages();
    useCatalogMessages();
    useWalletMessages();
    useRoomMessages();

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) =>
            {
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1])
                {
                    case 'open':
                        if (parts.length > 2)
                        {
                            switch (parts[2])
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

    return <Main />;
};
