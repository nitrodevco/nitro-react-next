import { classNames } from '#base/utils';
import { LoadingView, Main } from '#themes/default';
import { GetAssetManager, GetAvatarRenderManager, GetCommunication, GetConfiguration, GetLocalizationManager, GetRenderer, GetRoomEngine, GetRoomSessionManager, GetSessionDataManager, GetSoundManager, GetStage, GetTexturePool, GetTicker, NitroLogger, PrepareRenderer } from '@nitrots/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useContext, useEffect, useState } from 'react';
import { NitroConfigContext } from './context';

export const App: FC = () =>
{
    const [ isReady, setIsReady ] = useState(false);
    const { getConfigValue = null } = useContext(NitroConfigContext);

    useEffect(() =>
    {
        if(!getConfigValue) return;

        GetTicker().maxFPS = getConfigValue<number>('renderer.fps', 24);
        NitroLogger.LOG_DEBUG = getConfigValue<boolean>('logging.debug', true);
        NitroLogger.LOG_WARN = getConfigValue<boolean>('logging.warn', false);
        NitroLogger.LOG_ERROR = getConfigValue<boolean>('logging.error', false);
        NitroLogger.LOG_EVENTS = getConfigValue<boolean>('logging.events', false);
        NitroLogger.LOG_PACKETS = getConfigValue<boolean>('logging.packets', false);
    }, [ getConfigValue ]);

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

                const assetUrls = getConfigValue<string[]>('asset.urls.preload') || [];

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
        }
    
        setup(window.innerWidth, window.innerHeight);
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
