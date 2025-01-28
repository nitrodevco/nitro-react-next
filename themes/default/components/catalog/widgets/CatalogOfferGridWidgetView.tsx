import { IPurchasableOffer, ProductTypeEnum, SendMessageComposer } from '#base/api';
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
        setCurrentOffer
    ] = useCatalogStore(
        useShallow(state => [
            state.currentPage,
            state.currentOffer,
            state.setCurrentOffer,
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

            if(offer.product && (offer.product.productType === ProductTypeEnum.WALL))
            {
                /* setPurchaseOptions(prevValue =>
                {
                    const newValue = { ...prevValue };
    
                    newValue.extraData = (offer.product.extraParam || null);
    
                    return newValue;
                }); */
            }
        }
    };

    if(!currentPage.offers || !currentPage.offers.length) return null;

    return (
        <NitroInfiniteGrid<IPurchasableOffer>
            key={ `catalog-offer-grid-${ currentPage.pageId }` }
            items={ currentPage.offers }
            itemRender={ item => <CatalogGridItemView offer={ item } currentOffer={ currentOffer } selectOffer={ selectOffer } /> }
        />
    );
};
