import { useCatalogStore } from '#base/stores';
import { NitroPriceBadge } from '#themes/default';
import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useShallow } from 'zustand/shallow';

export const CatalogPriceDisplayWidget: FC<{
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

    if(!currentOffer) return null;

    const separator = true;
    const quantity = currentOfferOptions?.quantity || 1;

    return (
        <>
            { (currentOffer.priceInCredits > 0) &&
                <NitroPriceBadge type={ -1 } amount={ (currentOffer.priceInCredits * quantity) } /> }
            { separator && (currentOffer.priceInCredits > 0) && (currentOffer.priceInActivityPoints > 0) &&
                <FaPlus className="fa-icon" color="black" size="xs" /> }
            { (currentOffer.priceInActivityPoints > 0) &&
                <NitroPriceBadge type={ currentOffer.activityPointType } amount={ (currentOffer.priceInActivityPoints * quantity) } /> }
        </>
    );
}
