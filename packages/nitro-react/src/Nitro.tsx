import { App } from './App';
import { useConfigLoader } from './hooks';
import { LoadingView } from './utils';

export const Nitro = () =>
{
    const { isConfigReady = false } = useConfigLoader();

    if (!isConfigReady) return <LoadingView />;

    return <App />;
}
