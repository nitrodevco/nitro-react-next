import { IFurnitureData } from '@nitrodevco/nitro-renderer';
import { CatalogPricingModelType } from './CatalogPricingModelType';
import { CatalogPricingType } from './CatalogPricingType';
import { CatalogType } from './CatalogType';
import { ICatalogNode } from './ICatalogNode';
import { IProduct } from './IProduct';
import { IPurchasableOffer } from './IPurchasableOffer';
import { ProductTypeEnum } from './ProductTypeEnum';

export const EFFECT_CLASSID_NINJA_DISAPPEAR: number = 108;

export const GetNodesForOfferIds = (offerNodes: { [key: string]: ICatalogNode[] }, ...offerIds: number[]) =>
{
    const allowedNodes: ICatalogNode[] = [];

    for (const offerId of offerIds)
    {
        const nodes = offerNodes[offerId.toString()];

        if (nodes && nodes.length)
        {
            for (const node of nodes) node.isVisible && allowedNodes.push(node);
        }
    }

    return allowedNodes;
};

export const ProcessSearchWithFurnitureData = (searchValue: string, catalogType: string, furnitureDatas: IFurnitureData[], offerNodes: { [key: string]: ICatalogNode[] }) =>
{
    const validFurnitureDatas: IFurnitureData[] = [];
    const validFurnitureLines: string[] = [];

    for (const furnitureData of furnitureDatas)
    {
        if ((catalogType === CatalogType.BUILDER) && !furnitureData.availableForBuildersClub) continue;

        if ((catalogType === CatalogType.NORMAL) && furnitureData.excludeDynamic) continue;

        const searchValues = [furnitureData.className, furnitureData.name, furnitureData.description].join(' ').replace(/ /gi, '').toLowerCase();

        if ((catalogType === CatalogType.BUILDER) && (furnitureData.purchaseOfferId === -1) && (furnitureData.rentOfferId === -1))
        {
            if ((furnitureData.furniLine !== '') && (validFurnitureLines.indexOf(furnitureData.furniLine) < 0))
            {
                if (searchValues.indexOf(searchValue) >= 0) validFurnitureLines.push(furnitureData.furniLine);
            }
        }
        else
        {
            const foundNodes = GetNodesForOfferIds(offerNodes, furnitureData.purchaseOfferId, furnitureData.rentOfferId);

            if (foundNodes.length)
            {
                if (searchValues.indexOf(searchValue) >= 0) validFurnitureDatas.push(furnitureData);

                if (validFurnitureDatas.length === 250) break;
            }
        }
    }

    const offers: IPurchasableOffer[] = [];

    for (const furnitureData of validFurnitureDatas)
    {
        const product: IProduct = {
            productType: furnitureData.type.toLowerCase(),
            productClassId: furnitureData.id,
            extraParam: furnitureData.customParams,
            productCount: 1,
            furnitureData,
            isUniqueLimitedItem: false,
            uniqueLimitedItemSeriesSize: 0,
            uniqueLimitedItemsLeft: 0
        };

        const furnitureOffer: IPurchasableOffer = {
            offerId: (furnitureData.rentOfferId > -1) ? furnitureData.rentOfferId : furnitureData.purchaseOfferId,
            localizationId: `roomItem.name.${furnitureData.id}`,
            localizationName: furnitureData.name,
            localizationDescription: furnitureData.description,
            priceInCredits: 0,
            priceInActivityPoints: 0,
            activityPointType: 0,
            pricingModel: CatalogPricingModelType.PRICING_MODEL_FURNITURE,
            priceType: '',
            product,
            products: [product],
            clubLevel: 0,
            giftable: false,
            bundlePurchaseAllowed: false,
            isRentOffer: (furnitureData.rentOfferId > -1),
            isLazy: true,
            page: null, // need still
            badgeCode: ''
        };

        offers.push(furnitureOffer);
    }

    let nodes: ICatalogNode[] = [];

    const filterCatalogNode = (search: string, furniLines: string[], node: ICatalogNode, nodes: ICatalogNode[]) =>
    {
        if (node.isVisible && (node.pageId > 0))
        {
            let nodeAdded = false;

            const hayStack = [node.pageName, node.localization].join(' ').toLowerCase().replace(/ /gi, '');

            if (hayStack.indexOf(search) > -1)
            {
                nodes.push(node);

                nodeAdded = true;
            }

            if (!nodeAdded)
            {
                for (const furniLine of furniLines)
                {
                    if (hayStack.indexOf(furniLine) >= 0)
                    {
                        nodes.push(node);

                        break;
                    }
                }
            }
        }

        for (const child of node.children) filterCatalogNode(search, furniLines, child, nodes);
    };

    return {
        searchValue,
        offers,
        nodes
    };
}

export const GetPricingType = (priceInCredits: number, priceInActivityPoints: number) =>
{
    if ((priceInCredits > 0) && (priceInActivityPoints > 0)) return CatalogPricingType.PRICE_TYPE_CREDITS_ACTIVITYPOINTS;

    if (priceInCredits > 0) return CatalogPricingType.PRICE_TYPE_CREDITS;

    if (priceInActivityPoints > 0) return CatalogPricingType.PRICE_TYPE_ACTIVITYPOINTS;

    return CatalogPricingType.PRICE_TYPE_NONE;
}

export const GetPricingModelForProducts = (products: IProduct[]) =>
{
    products = products.filter(product => ((product.productType !== ProductTypeEnum.Badge) && (product.productType !== ProductTypeEnum.Effect) && (product.productClassId !== EFFECT_CLASSID_NINJA_DISAPPEAR)));

    if (products.length === 1)
    {
        if (products[0].productCount === 1) return CatalogPricingModelType.PRICING_MODEL_SINGLE;

        return CatalogPricingModelType.PRICING_MODEL_MULTI;
    }

    if (products.length > 1) return CatalogPricingModelType.PRICING_MODEL_BUNDLE;

    return CatalogPricingModelType.PRICING_MODEL_UNKNOWN;
}
