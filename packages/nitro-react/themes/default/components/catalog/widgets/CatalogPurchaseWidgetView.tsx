import { CatalogPricingModelType, CatalogPurchaseState, CurrencyType, LocalizeText, SendMessageComposer } from '#base/api';
import { CatalogPurchasedEvent, CatalogPurchaseFailureEvent, CatalogPurchaseNotAllowedEvent, CatalogPurchaseSoldOutEvent } from '#base/events';
import { useConfigValue, useEventListener } from '#base/hooks';
import { useCatalogStore, useWalletStore } from '#base/stores';
import { NitroButton } from '#themes/default';
import { HabboClubLevelEnum, PurchaseFromCatalogComposer } from '@nitrodevco/nitro-renderer';
import { useSessionStore } from '@nitrodevco/nitro-shared-storage';
import { FC, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const CatalogPurchaseWidgetView: FC<{
}> = props =>
    {
        const [
            currentOffer,
            currentOfferOptions,
        ] = useCatalogStore(
            useShallow(state => [
                state.currentOffer,
                state.currentOfferOptions
            ]));
        const currencies = useWalletStore(state => state.currencies);
        const clubLevel = useSessionStore(state => state.clubLevel);
        const clubMemberLevel = useConfigValue<boolean>('hcDisabled', false) ? HabboClubLevelEnum.VIP : clubLevel;
        const [purchaseState, setPurchaseState] = useState(CatalogPurchaseState.NONE);

        useEventListener(CatalogPurchasedEvent.PURCHASE_SUCCESS, event => setPurchaseState(CatalogPurchaseState.NONE));

        useEventListener(CatalogPurchaseFailureEvent.PURCHASE_FAILED, event => setPurchaseState(CatalogPurchaseState.FAILED));

        useEventListener(CatalogPurchaseNotAllowedEvent.NOT_ALLOWED, event => setPurchaseState(CatalogPurchaseState.FAILED));

        useEventListener(CatalogPurchaseSoldOutEvent.SOLD_OUT, event => setPurchaseState(CatalogPurchaseState.SOLD_OUT));

        if (!currentOffer) return null;

        const isLimitedSoldOut = () =>
        {
            if (!currentOffer) return false;

            if (currentOfferOptions.extraParamRequired && (!currentOfferOptions.extraData || !currentOfferOptions.extraData.length)) return false;

            if (currentOffer.pricingModel === CatalogPricingModelType.PRICING_MODEL_SINGLE)
            {
                const product = currentOffer.product;

                if (product && product.isUniqueLimitedItem) return !product.uniqueLimitedItemsLeft;
            }

            return false;
        };

        const purchase = (isGift: boolean = false) =>
        {
            if (!currentOffer) return;

            if (clubMemberLevel < currentOffer.clubLevel)
            {
                //CreateLinkEvent('habboUI/open/hccenter');

                return;
            }

            if (isGift)
            {
                //DispatchUiEvent(new CatalogInitGiftEvent(currentOffer.page.pageId, currentOffer.offerId, purchaseOptions.extraData));

                return;
            }

            setPurchaseState(CatalogPurchaseState.PENDING);

            /* if(purchaseCallback)
            {
                purchaseCallback();
    
                return;
            } */

            let pageId = currentOffer.page.pageId;

            // if(pageId === -1)
            // {
            //     const nodes = getNodesByOfferId(currentOffer.offerId);

            //     if(nodes) pageId = nodes[0].pageId;
            // }

            SendMessageComposer(new PurchaseFromCatalogComposer(pageId, currentOffer.offerId, currentOfferOptions.extraData, currentOfferOptions.quantity));
        };

        const PurchaseButton = () =>
        {
            const priceCredits = (currentOffer.priceInCredits * currentOfferOptions.quantity);
            const pricePoints = (currentOffer.priceInActivityPoints * currentOfferOptions.quantity);

            let message = '';

            if (clubMemberLevel < currentOffer.clubLevel) message = LocalizeText('catalog.alert.hc.required');
            if (isLimitedSoldOut()) message = LocalizeText('catalog.alert.limited_edition_sold_out.title');
            if (priceCredits > currencies[CurrencyType.CREDITS]) message = LocalizeText('catalog.alert.notenough.title');
            if (pricePoints > currencies[currentOffer.activityPointType]) message = LocalizeText(`catalog.alert.notenough.activitypoints.title.${currentOffer.activityPointType}`);

            if (message && message.length) return <NitroButton disabled variant="danger">{message}</NitroButton>;

            switch (purchaseState)
            {
                case CatalogPurchaseState.CONFIRM:
                    return <NitroButton variant="warning" onClick={event => purchase()}>{LocalizeText('catalog.marketplace.confirm_title')}</NitroButton>;
                case CatalogPurchaseState.PENDING:
                    return <NitroButton disabled>
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" fill="none" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                    </NitroButton>;
                case CatalogPurchaseState.FAILED:
                    return <NitroButton variant="danger">{LocalizeText('generic.failed')}</NitroButton>;
                case CatalogPurchaseState.SOLD_OUT:
                    return <NitroButton variant="danger">{LocalizeText('generic.failed') + ' - ' + LocalizeText('catalog.alert.limited_edition_sold_out.title')}</NitroButton>;
                case CatalogPurchaseState.NONE:
                default:
                    return <NitroButton disabled={(currentOfferOptions.extraParamRequired && (!currentOfferOptions.extraData || !currentOfferOptions.extraData.length))} onClick={event => setPurchaseState(CatalogPurchaseState.CONFIRM)}>{LocalizeText('catalog.purchase_confirmation.' + (currentOffer.isRentOffer ? 'rent' : 'buy'))}</NitroButton>;
            }
        };

        return <PurchaseButton />
    }
