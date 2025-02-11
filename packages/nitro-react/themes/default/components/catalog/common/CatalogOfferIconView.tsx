import { IPurchasableOffer, ProductTypeEnum } from '#base/api';
import { useConfigValue } from '#base/hooks';
import { NitroBadgeImage, NitroImage } from '#themes/default';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

export const CatalogOfferIconView: FC<{
    offer: IPurchasableOffer;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props =>
    {
        const { offer = null, ...rest } = props;
        const baseUrl = useConfigValue<string>('asset.urls.catalog', '');

        if (!offer) return null;

        const product = offer.product;

        if (!product) return null;

        let imageUrl = '';

        switch (product.productType)
        {
            case ProductTypeEnum.Floor:
                imageUrl = GetRoomEngine().getFurnitureFloorIconUrl(product.productClassId);
                break;
            case ProductTypeEnum.Wall: {
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
                        imageUrl = `${baseUrl}/${iconName}.png`;

                        break;
                    }
                }

                imageUrl = GetRoomEngine().getFurnitureWallIconUrl(product.productClassId, product.extraParam);

                break;
            }
            case ProductTypeEnum.Effect:
                imageUrl = '';
                // GetPixelEffectIcon(product.productClassId);
                break;
            case ProductTypeEnum.HabboClub:
                imageUrl = '';
                // GetSubscriptionProductIcon(product.productClassId);
                break;
            case ProductTypeEnum.Badge:
                return <NitroBadgeImage badgeCode={product.extraParam} {...rest} />;
            case ProductTypeEnum.Robot:
                return null;
        }

        return <NitroImage url={imageUrl} {...rest} />;
    }
