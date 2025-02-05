import { SendMessageComposer } from '#base/api/index.ts';
import { NitroConfigContext } from '#base/context/NitroConfigContext.tsx';
import { useWalletStore } from '#base/stores/newWalletStore.ts';
import { UserCurrencyComposer, UserSubscriptionComposer } from '@nitrots/nitro-renderer';
import { FC, useContext, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const WalletView: FC<{

}> = props =>
{
    const [
        currencies,
        walletNeedsUpdate,
        setWalletNeedsUpdate
    ] = useWalletStore(
    useShallow(state => [
        state.currencies,
        state.walletNeedsUpdate,
        state.setWalletNeedsUpdate]));
    const { getConfigValue = null } = useContext(NitroConfigContext);
    const hcDisabled = getConfigValue('settings.hcDisabled', false);

    useEffect(() =>
    {
        if(hcDisabled) return;

        SendMessageComposer(new UserSubscriptionComposer('habbo_club'));

        const interval = setInterval(() => SendMessageComposer(new UserSubscriptionComposer('habbo_club')), 50000);

        return () => clearInterval(interval);
    }, [ hcDisabled ]);

    useEffect(() =>
    {
        if(!walletNeedsUpdate) return;

        SendMessageComposer(new UserCurrencyComposer());

        setWalletNeedsUpdate(false);
    }, [ walletNeedsUpdate ]);

    return (
        <div className="flex flex-col items-end pointer-events-auto text-sm gap-1">
            <div className="flex bg-[#1c1c20f2] [box-shadow:inset_0_5px_#22222799,_inset_0_-4px_#12121599] rounded-md p-1">
                
            </div>
        </div>
    );
}
