import { IPurchasableOffer, ProductType } from '#base/api';
import { useConfigValue } from '#base/hooks/index.ts';
import { NitroBadgeImage, NitroImage } from '#themes/default';
import { GetRoomEngine } from '@nitrots/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

export const CatalogOfferIconView: FC<{
    offer: IPurchasableOffer;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
{
    const { offer = null, ...rest } = props;
    const baseUrl = useConfigValue<string>('asset.urls.catalog', '');

    if(!offer) return null;

    const product = offer.product;
    
    if (!product) return null;

    let imageUrl = '';
    
    switch (product.productType)
    {
        case ProductType.FLOOR:
            imageUrl = GetRoomEngine().getFurnitureFloorIconUrl(product.productClassId);
            break;
        case ProductType.WALL: {
            if (product.furnitureData)
            {
                let iconName = '';

                switch (product.furnitureData.className)
                {
                    case 'floor':
                        iconName = ['th', product.furnitureData.className, offer.product.extraParam].join('_');
                        break;
                    case 'wallpaper':
                        iconName = ['th', 'wall', offer.product.extraParam].join('_');
                        break;
                    case 'landscape':
                        iconName = ['th', product.furnitureData.className, (offer.product.extraParam || '').replace('.', '_'), '001'].join('_');
                        break;
                }

                if (iconName !== '')
                {
                    imageUrl = `${ baseUrl }/${iconName}.png`;

                    break;
                }
            }

            imageUrl = GetRoomEngine().getFurnitureWallIconUrl(product.productClassId, product.extraParam);

            break;
        }
        case ProductType.EFFECT:
            imageUrl = '';
            // GetPixelEffectIcon(product.productClassId);
            break;
        case ProductType.HABBO_CLUB:
            imageUrl = '';
            // GetSubscriptionProductIcon(product.productClassId);
            break;
        case ProductType.BADGE:
            return <NitroBadgeImage badgeCode={ product.extraParam } { ...rest } />;
        case ProductType.ROBOT:
            return null;
    }

    return <NitroImage url={ imageUrl } { ...rest } />;
}
