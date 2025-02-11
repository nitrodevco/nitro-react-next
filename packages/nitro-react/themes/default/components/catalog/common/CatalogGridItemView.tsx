import { IPurchasableOffer } from '#base/api';
import { classNames } from '#base/utils';
import { NitroInfiniteGridItem } from '#themes/default';
import { MouseEventType } from '@nitrodevco/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';
import { CatalogOfferIconView } from './CatalogOfferIconView';

export const CatalogGridItemView: FC<{
    offer: IPurchasableOffer;
    currentOffer: IPurchasableOffer;
    selectOffer: (offer: IPurchasableOffer) => void;
}> = props =>
    {
        const { offer = null, currentOffer = null, selectOffer = null } = props;
        const [isMouseDown, setMouseDown] = useState(false);

        const onMouseEvent = (event: MouseEvent) =>
        {
            switch (event.type)
            {
                case MouseEventType.MOUSE_DOWN:
                    selectOffer(offer);
                    setMouseDown(true);
                    return;
                case MouseEventType.MOUSE_UP:
                    setMouseDown(false);
                    return;
                case MouseEventType.ROLL_OUT:
                    if (!isMouseDown || (offer !== currentOffer)) return;

                    //requestOfferToMover(offer);
                    return;
            }
        };

        const product = offer.product;

        return (
            <NitroInfiniteGridItem
                gridItemActive={(offer === currentOffer)}
                className={classNames(
                    (product.uniqueLimitedItemSeriesSize > 0) && 'unique-item'
                )}
                onMouseEvent={onMouseEvent}>
                <CatalogOfferIconView offer={offer} />
            </NitroInfiniteGridItem>
        );
    };
