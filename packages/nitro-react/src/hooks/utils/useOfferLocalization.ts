import { IPurchasableOffer } from '#base/api';
import { useCatalogStore } from '#base/stores';

export const useOfferLocalization = (offer: IPurchasableOffer) =>
{
    const productData = useCatalogStore(state => state.productData);

    let name = '';
    let description = '';

    if (offer)
    {
        const offerProductData = productData?.[offer.localizationId];

        name = offerProductData?.name ?? offer.localizationName;
        description = offerProductData?.description ?? offer.localizationDescription;
    }

    return {
        name,
        description,
    };
}
