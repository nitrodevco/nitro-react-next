import { GetSessionDataManager, IProductData } from '@nitrodevco/nitro-renderer';

export function GetProductDataForLocalization(localizationId: string): IProductData
{
    if (!localizationId) return null;

    return GetSessionDataManager().getProductData(localizationId);
}
