import { classNames } from '#base/utils';
import { LoadingView, Main } from '#themes/default';
import { GetAssetManager, GetAvatarRenderManager, GetCommunication, GetConfiguration, GetLocalizationManager, GetRenderer, GetRoomEngine, GetRoomSessionManager, GetSessionDataManager, GetSoundManager, GetStage, GetTexturePool, GetTicker, NitroLogger, PrepareRenderer } from '@nitrots/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useState } from 'react';

export const App: FC = () =>
{
    const [ isReady, setIsReady ] = useState(false);

    useEffect(() =>
    {
        const prepare = async (width: number, height: number) =>
        {
            try
            {
                if(!window.NitroConfig) throw new Error('NitroConfig is not defined!');

                const renderer = await PrepareRenderer({
                    width,
                    height,
                    autoDensity: true,
                    backgroundAlpha: 0,
                    preference: 'webgl'
                });

                await GetConfiguration().init();

                GetTicker().maxFPS = GetConfiguration().getValue<number>('system.fps.max', 24);
                NitroLogger.LOG_DEBUG = GetConfiguration().getValue<boolean>('system.log.debug', true);
                NitroLogger.LOG_WARN = GetConfiguration().getValue<boolean>('system.log.warn', false);
                NitroLogger.LOG_ERROR = GetConfiguration().getValue<boolean>('system.log.error', false);
                NitroLogger.LOG_EVENTS = GetConfiguration().getValue<boolean>('system.log.events', false);
                NitroLogger.LOG_PACKETS = GetConfiguration().getValue<boolean>('system.log.packets', false);

                const assetUrls = GetConfiguration().getValue<string[]>('preload.assets.urls').map(url => GetConfiguration().interpolate(url)) ?? [];

                await Promise.all(
                    [
                        GetAssetManager().downloadAssets(assetUrls),
                        GetLocalizationManager().init(),
                        GetAvatarRenderManager().init(),
                        GetSoundManager().init(),
                        GetSessionDataManager().init(),
                        GetRoomSessionManager().init()
                    ]
                );

                await GetRoomEngine().init();
                await GetCommunication().init();

                // new GameMessageHandler();

                GetTicker().add(ticker =>
                {
                    GetRoomEngine().update(ticker);
                    GetRenderer().render(GetStage());
                    GetTexturePool().run();
                });

                setIsReady(true);
            }

            catch(err)
            {
                NitroLogger.error(err);
            }
        };

        prepare(window.innerWidth, window.innerHeight);
    }, []);

    return (
        <div className={classNames(
            'w-full h-full overflow-hidden text-base bg-black',
            !(window.devicePixelRatio % 1) && '[image-rendering:pixelated]',
        )}>
            <AnimatePresence>
                { !isReady &&
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <LoadingView />
                    </motion.div> }
            </AnimatePresence>
            { isReady && <Main /> }
            <div id="draggable-windows-container" className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden" />
        </div>
    );
};
