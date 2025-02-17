import { IProductData, SendMessageComposer } from '#base/api';
import { useCatalogStore } from '#base/stores';
import { BuildersClubQueryFurniCountMessageComposer, GetCatalogIndexComposer, GetClubGiftInfo, GetGiftWrappingConfigurationComposer } from '@nitrodevco/nitro-renderer';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useConfigValue } from '../utils';

export const useCatalogLogic = () =>
{
    const [
        catalogType,
        productDataNeedsUpdate,
        catalogNeedsUpdate,
        setProductData,
        setCatalogNeedsUpdate
    ] = useCatalogStore(
        useShallow(state => [
            state.catalogType,
            state.productDataNeedsUpdate,
            state.catalogNeedsUpdate,
            state.setProductData,
            state.setCatalogNeedsUpdate
        ]));
    const productDataUrl = useConfigValue('gamedata.urls.productData', '');

    useEffect(() =>
    {
        if (!productDataNeedsUpdate || !productDataUrl?.length) return;

        const load = async () =>
        {
            const response = await fetch(productDataUrl);

            let data = await response.json() as Record<string, any>;

            if (!Array.isArray(data?.productdata?.product)) return;

            const newProductData: Record<string, IProductData> = {};

            data.productdata.product.forEach(product =>
            {
                const code = product.code;
                const name = product.name;
                const description = product.description;

                if (!code?.length) return;

                newProductData[code] = { code, name, description };
            });

            setProductData(newProductData);
        }

        load();
    }, [productDataNeedsUpdate, productDataUrl]);

    useEffect(() =>
    {
        if (!catalogNeedsUpdate) return;

        SendMessageComposer(new GetGiftWrappingConfigurationComposer());
        SendMessageComposer(new GetClubGiftInfo());
        SendMessageComposer(new GetCatalogIndexComposer(catalogType));
        SendMessageComposer(new BuildersClubQueryFurniCountMessageComposer());

        setCatalogNeedsUpdate(false);
    }, [catalogNeedsUpdate, catalogType]);
}
