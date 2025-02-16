import { GetAssetManager, GetAvatarRenderManager, GetCommunication, GetRoomEngine, GetRoomSessionManager, GetSessionDataManager, GetSoundManager, GetStage, GetTexturePool, GetTicker, PrepareRenderer } from '@nitrodevco/nitro-renderer';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { useEffect, useState } from 'react';
import { useConfigValue } from '../utils';

export const useNitroRendererSetup = () =>
{
    const [isReady, setIsReady] = useState(false);
    const preloadAssetUrls = useConfigValue<string[]>('asset.urls.preload') || [];

    useEffect(() =>
    {
        const setup = async (width: number, height: number) =>
        {
            try
            {
                const renderer = await PrepareRenderer({
                    width,
                    height,
                    autoDensity: true,
                    backgroundAlpha: 0,
                    preference: 'webgl',
                    roundPixels: true
                });

                await Promise.all(
                    [
                        GetAssetManager().downloadAssets(preloadAssetUrls),
                        GetAvatarRenderManager().init(),
                        GetSoundManager().init(),
                        GetSessionDataManager().init(),
                        GetRoomSessionManager().init()
                    ]
                );

                await GetRoomEngine().init();
                await GetCommunication().init();

                GetTicker().add(ticker =>
                {
                    GetRoomEngine().update(ticker);
                    renderer.render(GetStage());
                    GetTexturePool().run();
                });

                setIsReady(true);
            }

            catch (err)
            {
                NitroLogger.error(err);
            }
        }

        setup(window.innerWidth, window.innerHeight);
    }, []);

    return isReady;
}
