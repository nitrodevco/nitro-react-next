import { classNames } from '#layout';
import { GetAssetManager, GetAvatarRenderManager, GetCommunication, GetConfiguration, GetLocalizationManager, GetRoomEngine, GetRoomSessionManager, GetSessionDataManager, GetSoundManager, GetStage, GetTexturePool, GetTicker, HabboWebTools, LegacyExternalInterface, NitroLogger, PrepareRenderer } from '@nitrots/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useState } from 'react';
import { LoadingView } from './components';

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

                if(LegacyExternalInterface.available) LegacyExternalInterface.call('legacyTrack', 'authentication', 'authok', []);

                HabboWebTools.sendHeartBeat();

                setInterval(() => HabboWebTools.sendHeartBeat(), 10000);

                GetTicker().add(ticker => GetRoomEngine().update(ticker));
                GetTicker().add(() => renderer.render(GetStage()));
                GetTicker().add(() => GetTexturePool().run());

                setIsReady(true);

                // handle socket close
                //canvas.addEventListener('webglcontextlost', () => instance.events.dispatchEvent(new NitroEvent(Nitro.WEBGL_CONTEXT_LOST)));
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
                { !isReady && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <LoadingView />
                </motion.div> }
            </AnimatePresence>
            { !isReady && <LoadingView /> }
        </div>
    );
};
