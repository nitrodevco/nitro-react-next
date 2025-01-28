import { GetIconUrlForProduct, IPurchasableOffer } from '#base/api';
import { classNames } from '#base/utils';
import { NitroImage, NitroInfiniteGridItem } from '#themes/default/layout';
import { MouseEventType } from '@nitrots/nitro-renderer';
import { FC, MouseEvent, useState } from 'react';

export const CatalogGridItemView: FC<{
    offer: IPurchasableOffer;
    currentOffer: IPurchasableOffer;
    selectOffer: (offer: IPurchasableOffer) => void;
}> = props =>
{
    const { offer = null, currentOffer = null, selectOffer = null } = props;
    const [ isMouseDown, setMouseDown ] = useState(false);

    const onMouseEvent = (event: MouseEvent) =>
    {
        switch(event.type)
        {
            case MouseEventType.MOUSE_DOWN:
                selectOffer(offer);
                setMouseDown(true);
                return;
            case MouseEventType.MOUSE_UP:
                setMouseDown(false);
                return;
            case MouseEventType.ROLL_OUT:
                if(!isMouseDown || (offer !== currentOffer)) return;

                //requestOfferToMover(offer);
                return;
        }
    };

    const product = offer.product;
    const imageUrl = GetIconUrlForProduct(product, offer);

    return (
        <NitroInfiniteGridItem
            gridItemActive={ (offer === currentOffer) }
            className={ classNames(
                (product.uniqueLimitedItemSeriesSize > 0) && 'unique-item'
            ) }
            onMouseEvent={ onMouseEvent }>
                <NitroImage
                    url={ imageUrl } />
        </NitroInfiniteGridItem>
    );
};
