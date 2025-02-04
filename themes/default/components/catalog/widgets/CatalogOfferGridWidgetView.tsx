import { IPurchasableOffer, ProductType, SendMessageComposer } from '#base/api';
import { useCatalogStore } from '#base/stores';
import { NitroInfiniteGrid } from '#themes/default/layout';
import { GetProductOfferComposer } from '@nitrots/nitro-renderer';
import { FC } from 'react';
import { useShallow } from 'zustand/shallow';
import { CatalogGridItemView } from '../common/CatalogGridItemView';

export const CatalogOfferGridWidgetView: FC<{
}> = props =>
{
    const [
        currentPage,
        currentOffer,
        setCurrentOffer,
        updateCurrentOfferOptions
    ] = useCatalogStore(
        useShallow(state => [
            state.currentPage,
            state.currentOffer,
            state.setCurrentOffer,
            state.updateCurrentOfferOptions
        ]));

    const selectOffer = (offer: IPurchasableOffer) =>
    {
        if(offer.isLazy)
        {
            SendMessageComposer(new GetProductOfferComposer((offer.product?.furnitureData?.rentOfferId > -1) ? offer.product?.furnitureData?.rentOfferId : offer.product?.furnitureData?.purchaseOfferId));
        }
        else
        {
            setCurrentOffer(offer);

            if(offer.product && (offer.product.productType === ProductType.WALL))
            {
                updateCurrentOfferOptions({
                    extraData: (offer.product.extraParam || null)
                });
            }
        }
    };

    if(!currentPage.offers || !currentPage.offers.length) return null;

    return (
        <NitroInfiniteGrid<IPurchasableOffer>
            key={ `catalog-offer-grid-${ currentPage.pageId }` }
            items={ currentPage.offers }
            getKey={ item => item.offerId }
            itemRender={ item => <CatalogGridItemView offer={ item } currentOffer={ currentOffer } selectOffer={ selectOffer } /> }
        />
    );
};
