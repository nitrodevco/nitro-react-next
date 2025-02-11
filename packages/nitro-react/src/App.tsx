import { DefaultTheme, LoadingView } from '#themes/default';
import { GetAssetManager, GetAvatarRenderManager, GetCommunication, GetConfiguration, GetLocalizationManager, GetRenderer, GetRoomEngine, GetRoomSessionManager, GetSessionDataManager, GetSoundManager, GetStage, GetTexturePool, GetTicker, NitroLogger, PrepareRenderer } from '@nitrodevco/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useState } from 'react';
import { useConfigValue } from './hooks/index';

export const App: FC = () =>
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

                await GetConfiguration().init();

                await Promise.all(
                    [
                        GetAssetManager().downloadAssets(preloadAssetUrls),
                        GetLocalizationManager().init(),
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
                    GetRenderer().render(GetStage());
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

    return (
        <>
            <AnimatePresence>
                {!isReady &&
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <LoadingView />
                    </motion.div>}
            </AnimatePresence>
            {isReady && <DefaultTheme />}
            <div id="draggable-windows-container" className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden" />
        </>
    );
};
