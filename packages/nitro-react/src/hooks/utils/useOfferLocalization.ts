import { IPurchasableOffer } from '#base/api';
import { useCatalogStore } from '#base/stores';

export const useOfferLocalization = <T>(offer: IPurchasableOffer, type: 'name' | 'description') =>
{
    const productData = useCatalogStore(state => state.productData);

    let text = '';

    if (offer)
    {
        const offerProductData = productData?.[offer.localizationId];

        if (type === 'name')
        {
            text = offerProductData?.name ?? offer.localizationName;
        }

        else if (type === 'description')
        {
            text = offerProductData?.description ?? offer.localizationDescription;
        }
    }

    return text;
}
