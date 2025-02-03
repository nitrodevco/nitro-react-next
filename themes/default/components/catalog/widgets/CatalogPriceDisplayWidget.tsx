import { useCatalogStore } from '#base/stores';
import { NitroCurrencyIcon } from '#themes/default/layout';
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
                <div className="flex items-center gap-1 rounded-md">
                    <span className="font-bold">{ (currentOffer.priceInCredits * quantity) }</span>
                    <NitroCurrencyIcon type={ -1 } />
                </div> }
            { separator && (currentOffer.priceInCredits > 0) && (currentOffer.priceInActivityPoints > 0) &&
                <FaPlus className="fa-icon" color="black" size="xs" /> }
            { (currentOffer.priceInActivityPoints > 0) &&
                <div className="flex items-center gap-1">
                    <span className="font-bold">{ (currentOffer.priceInActivityPoints * quantity) }</span>
                    <NitroCurrencyIcon type={ currentOffer.activityPointType } />
                </div> }
        </>
    );
}
