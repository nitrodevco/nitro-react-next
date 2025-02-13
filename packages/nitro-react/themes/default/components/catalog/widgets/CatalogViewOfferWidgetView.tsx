import { CatalogPricingModelType, FurniCategoryEnum, ProductTypeEnum } from '#base/api';
import { useCatalogStore, useSessionStore } from '#base/stores';
import { NitroRoomPreviewer } from '#themes/default';
import { GetAvatarRenderManager, GetSessionDataManager, RoomPreviewer, Vector3d } from '@nitrodevco/nitro-renderer';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const CatalogViewOfferWidgetView: FC<{
    roomPreviewer: RoomPreviewer;
}> = props =>
    {
        const { roomPreviewer = null } = props;
        const [
            currentOffer,
            currentOfferOptions,
        ] = useCatalogStore(
            useShallow(state => [
                state.currentOffer,
                state.currentOfferOptions
            ]));
        const figure = useSessionStore(state => state.figure);
        const gender = useSessionStore(state => state.gender);

        useEffect(() =>
        {
            if (!currentOffer || (currentOffer.pricingModel === CatalogPricingModelType.PRICING_MODEL_BUNDLE) || !roomPreviewer) return;

            const product = currentOffer.product;

            if (!product) return;

            roomPreviewer.reset(false);

            switch (product.productType)
            {
                case ProductTypeEnum.Floor: {
                    if (!product.furnitureData) return;

                    if (product.furnitureData.specialType === FurniCategoryEnum.FigurePurchasableSet)
                    {
                        const furniData = GetSessionDataManager().getFloorItemData(product.furnitureData.id);
                        const customParts = furniData.customParams.split(',').map(value => parseInt(value));
                        const figureSets: number[] = [];

                        for (const part of customParts)
                        {
                            if (GetAvatarRenderManager().isValidFigureSetForGender(part, gender)) figureSets.push(part);
                        }

                        const figureString = GetAvatarRenderManager().getFigureStringWithFigureIds(figure, gender, figureSets);

                        roomPreviewer.addAvatarIntoRoom(figureString, product.productClassId);
                    }
                    else
                    {
                        roomPreviewer.addFurnitureIntoRoom(product.productClassId, new Vector3d(90), currentOfferOptions.previewStuffData, product.extraParam);
                    }
                    return;
                }
                case ProductTypeEnum.Wall: {
                    if (!product.furnitureData) return;

                    switch (product.furnitureData.specialType)
                    {
                        case FurniCategoryEnum.Floor:
                            roomPreviewer.updateObjectRoom(product.extraParam);
                            return;
                        case FurniCategoryEnum.Wallpaper:
                            roomPreviewer.updateObjectRoom(null, product.extraParam);
                            return;
                        case FurniCategoryEnum.Landscape: {
                            roomPreviewer.updateObjectRoom(null, null, product.extraParam);

                            const furniData = GetSessionDataManager().getWallItemDataByName('window_double_default');

                            if (furniData) roomPreviewer.addWallItemIntoRoom(furniData.id, new Vector3d(90), furniData.customParams);
                            return;
                        }
                        default:
                            roomPreviewer.updateObjectRoom('default', 'default', 'default');
                            roomPreviewer.addWallItemIntoRoom(product.productClassId, new Vector3d(90), product.extraParam);
                            return;
                    }
                }
                case ProductTypeEnum.Robot:
                    roomPreviewer.addAvatarIntoRoom(product.extraParam, 0);
                    return;
                case ProductTypeEnum.Effect:
                    roomPreviewer.addAvatarIntoRoom(figure, product.productClassId);
                    return;
            }
        }, [currentOffer, currentOfferOptions, roomPreviewer]);

        if (!currentOffer) return null;

        if (currentOffer.pricingModel === CatalogPricingModelType.PRICING_MODEL_BUNDLE)
        {

        }

        return (
            <div className="h-[140px] w-full">
                <NitroRoomPreviewer roomPreviewer={roomPreviewer} />
            </div>
        );
    };
