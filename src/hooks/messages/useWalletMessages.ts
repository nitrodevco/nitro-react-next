import { CurrencyType } from '#base/api';
import { NitroConfigContext } from '#base/context';
import { useWalletStore } from '#base/stores';
import { ActivityPointNotificationMessageEvent, UserCreditsEvent, UserCurrencyEvent, UserSubscriptionEvent } from '@nitrots/nitro-renderer';
import { useContext } from 'react';
import { useShallow } from 'zustand/shallow';
import { useMessageEvent } from '../events';

export const useWalletMessages = () =>
{
    const [
        currencies,
        setCurrency,
        setCurrencies,
        processUserSubscription
    ] = useWalletStore(
        useShallow(state => [
            state.currencies,
            state.setCurrency,
            state.setCurrencies,
            state.processUserSubscription
        ]));
    const { setConfigValue = null } = useContext(NitroConfigContext);

    useMessageEvent<UserCreditsEvent>(UserCreditsEvent, event =>
    {
        const parser = event.getParser();
        const newCredits = parseFloat(parser.credits);
        const didCreditsUpdate = (currencies[CurrencyType.CREDITS] !== newCredits);

        setCurrency(CurrencyType.CREDITS, newCredits);

        //if(didCreditsUpdate) PlaySound(SoundNames.CREDITS);
    });

    useMessageEvent<UserCurrencyEvent>(UserCurrencyEvent, event =>
    {
        const parser = event.getParser();

        const currencies: { [key: number]: number } = {};

        parser.currencies.forEach((value, key) => currencies[key] = value);

        setCurrencies(currencies)
    });

    useMessageEvent<ActivityPointNotificationMessageEvent>(ActivityPointNotificationMessageEvent, event =>
    {
        const parser = event.getParser();

        setCurrency(parser.type, parser.amount);
    });

    useMessageEvent<UserSubscriptionEvent>(UserSubscriptionEvent, event =>
    {
        const parser = event.getParser();
        const productName = parser.productName;

        if ((productName !== 'club_habbo') && (productName !== 'habbo_club')) return;

        processUserSubscription(parser);
    });
}
