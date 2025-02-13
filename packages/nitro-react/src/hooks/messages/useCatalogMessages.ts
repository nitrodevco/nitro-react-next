import { CatalogPricingModelType, CatalogType, EFFECT_CLASSID_NINJA_DISAPPEAR, GetFurnitureData, GetPricingModelForProducts, GetPricingType, ICatalogPage, IProduct, IPurchasableOffer, ProductTypeEnum } from '#base/api';
import { CatalogPurchasedEvent, CatalogPurchaseFailureEvent, CatalogPurchaseNotAllowedEvent, CatalogPurchaseSoldOutEvent } from '#base/events';
import { useMessageEvent } from '#base/hooks';
import { useCatalogStore, useEventStore } from '#base/stores';
import { CatalogPageMessageEvent, CatalogPagesListEvent, LimitedEditionSoldOutEvent, PurchaseErrorMessageEvent, PurchaseNotAllowedMessageEvent, PurchaseOKMessageEvent } from '@nitrodevco/nitro-renderer';
import { useShallow } from 'zustand/shallow';

export const useCatalogMessages = () =>
{
    const [
        catalogType,
        currentPageId,
        productData,
        processNodeData,
        setCurrentPage,
        setFrontPageItems
    ] = useCatalogStore(
        useShallow(state => [
            state.catalogType,
            state.currentPageId,
            state.productData,
            state.processNodeData,
            state.setCurrentPage,
            state.setFrontPageItems
        ]));
    const emit = useEventStore(state => state.emit);

    useMessageEvent<CatalogPagesListEvent>(CatalogPagesListEvent, event =>
    {
        const parser = event.getParser();

        if (parser.root) processNodeData(parser.root);
    });

    useMessageEvent<CatalogPageMessageEvent>(CatalogPageMessageEvent, event =>
    {
        const parser = event.getParser();

        if (parser.catalogType !== catalogType) return;

        const purchasableOffers: IPurchasableOffer[] = [];
        const catalogPage: ICatalogPage = {
            pageId: parser.pageId,
            layoutCode: parser.layoutCode,
            localization: {
                texts: parser.localization.texts,
                images: parser.localization.images
            },
            offers: purchasableOffers,
            acceptSeasonCurrencyAsCredits: parser.acceptSeasonCurrencyAsCredits,
            mode: 0
        };

        for (const offer of parser.offers)
        {
            const products: IProduct[] = [];

            for (const product of offer.products) products.push({
                productType: product.productType.toLowerCase(),
                productClassId: product.furniClassId,
                extraParam: product.extraParam,
                productCount: product.productCount,
                furnitureData: GetFurnitureData(product.furniClassId, product.productType),
                isUniqueLimitedItem: product.uniqueLimitedItem,
                uniqueLimitedItemSeriesSize: product.uniqueLimitedSeriesSize,
                uniqueLimitedItemsLeft: product.uniqueLimitedItemsLeft
            });

            if (!products.length) continue;

            const badgeCode = products.find(product => product.productType === ProductTypeEnum.Badge)?.extraParam ?? null;
            const product = products.length === 1 ? products[0] : products.filter(product => ((product.productType !== ProductTypeEnum.Badge) && (product.productType !== ProductTypeEnum.Effect) && (product.productClassId !== EFFECT_CLASSID_NINJA_DISAPPEAR)))?.[0] ?? null;

            const purchasableOffer: IPurchasableOffer = {
                offerId: offer.offerId,
                localizationId: offer.localizationId,
                priceInCredits: offer.priceCredits,
                priceInActivityPoints: offer.priceActivityPoints,
                activityPointType: offer.priceActivityPointsType,
                pricingModel: GetPricingModelForProducts(products),
                priceType: GetPricingType(offer.priceCredits, offer.priceActivityPoints),
                product,
                products,
                clubLevel: offer.clubLevel,
                giftable: offer.giftable,
                bundlePurchaseAllowed: offer.bundlePurchaseAllowed,
                isRentOffer: offer.rent,
                isLazy: false,
                page: catalogPage,
                badgeCode
            };

            if ((catalogType === CatalogType.NORMAL) || ((purchasableOffer.pricingModel !== CatalogPricingModelType.PRICING_MODEL_BUNDLE) && (purchasableOffer.pricingModel !== CatalogPricingModelType.PRICING_MODEL_MULTI))) purchasableOffers.push(purchasableOffer);
        }

        setCurrentPage(catalogPage);

        if (parser.frontPageItems && parser.frontPageItems.length) setFrontPageItems(parser.frontPageItems);
    });

    useMessageEvent<PurchaseOKMessageEvent>(PurchaseOKMessageEvent, event =>
    {
        const parser = event.getParser();

        emit(new CatalogPurchasedEvent(parser.offer));
    });

    useMessageEvent<PurchaseErrorMessageEvent>(PurchaseErrorMessageEvent, event =>
    {
        const parser = event.getParser();

        emit(new CatalogPurchaseFailureEvent(parser.code));
    });

    useMessageEvent<PurchaseNotAllowedMessageEvent>(PurchaseNotAllowedMessageEvent, event =>
    {
        const parser = event.getParser();

        emit(new CatalogPurchaseNotAllowedEvent(parser.code));
    });

    useMessageEvent<LimitedEditionSoldOutEvent>(LimitedEditionSoldOutEvent, event =>
    {
        const parser = event.getParser();

        emit(new CatalogPurchaseSoldOutEvent());
    });

    /*useMessageEvent<ProductOfferEvent>(ProductOfferEvent, event =>
    {
        const parser = event.getParser();
        const offerData = parser.offer;

        if (!offerData || !offerData.products.length) return;

        const offerProductData = offerData.products[0];

        if (offerProductData.uniqueLimitedItem)
        {
            // update unique
        }

        const products: IProduct[] = [];
        const productData = GetProductDataForLocalization(offerData.localizationId);

        for (const product of offerData.products)
        {
            const furnitureData = GetFurnitureData(product.furniClassId, product.productType);

            products.push(new Product(product.productType, product.furniClassId, product.extraParam, product.productCount, productData, furnitureData, product.uniqueLimitedItem, product.uniqueLimitedSeriesSize, product.uniqueLimitedItemsLeft));
        }

        const offer = new Offer(offerData.offerId, offerData.localizationId, offerData.rent, offerData.priceCredits, offerData.priceActivityPoints, offerData.priceActivityPointsType, offerData.giftable, offerData.clubLevel, products, offerData.bundlePurchaseAllowed);

        if (!((currentType === CatalogType.NORMAL) || ((offer.pricingModel !== Offer.PRICING_MODEL_BUNDLE) && (offer.pricingModel !== Offer.PRICING_MODEL_MULTI)))) return;

        offer.page = currentPage;

        setCurrentOffer(offer);

        if (offer.product && (offer.product.productType === ProductTypeEnum.Wall))
        {
            setPurchaseOptions(prevValue =>
            {
                const newValue = { ...prevValue };

                newValue.extraData = (offer.product.extraParam || null);

                return newValue;
            });
        }

        // (this._isObjectMoverRequested) && (this._purchasableOffer)
    });

    useMessageEvent<SellablePetPalettesMessageEvent>(SellablePetPalettesMessageEvent, event =>
    {
        const parser = event.getParser();
        const petPalette = new CatalogPetPalette(parser.productCode, parser.palettes.slice());

        setCatalogOptions(prevValue =>
        {
            const petPalettes = [];

            if (prevValue.petPalettes) petPalettes.push(...prevValue.petPalettes);

            for (let i = 0; i < petPalettes.length; i++)
            {
                const palette = petPalettes[i];

                if (palette.breed === petPalette.breed)
                {
                    petPalettes.splice(i, 1);

                    break;
                }
            }

            petPalettes.push(petPalette);

            return { ...prevValue, petPalettes };
        });
    });

    useMessageEvent<HabboClubOffersMessageEvent>(HabboClubOffersMessageEvent, event =>
    {
        const parser = event.getParser();

        setCatalogOptions(prevValue =>
        {
            const clubOffers = parser.offers;

            return { ...prevValue, clubOffers };
        });
    });

    useMessageEvent<GuildMembershipsMessageEvent>(GuildMembershipsMessageEvent, event =>
    {
        const parser = event.getParser();

        setCatalogOptions(prevValue =>
        {
            const groups = parser.groups;

            return { ...prevValue, groups };
        });
    });

    useMessageEvent<GiftWrappingConfigurationEvent>(GiftWrappingConfigurationEvent, event =>
    {
        const parser = event.getParser();

        setCatalogOptions(prevValue =>
        {
            const giftConfiguration = new GiftWrappingConfiguration(parser);

            return { ...prevValue, giftConfiguration };
        });
    });

    useMessageEvent<MarketplaceMakeOfferResult>(MarketplaceMakeOfferResult, event =>
    {
        const parser = event.getParser();

        if (!parser) return;

        let title = '';
        if (parser.result === 1)
        {
            title = LocalizeText('inventory.marketplace.result.title.success');
        }
        else
        {
            title = LocalizeText('inventory.marketplace.result.title.failure');
        }

        const message = LocalizeText(`inventory.marketplace.result.${parser.result}`);

        simpleAlert(message, NotificationAlertType.DEFAULT, null, null, title);
    });

    useMessageEvent<ClubGiftInfoEvent>(ClubGiftInfoEvent, event =>
    {
        const parser = event.getParser();

        setCatalogOptions(prevValue =>
        {
            const clubGifts = parser;

            return { ...prevValue, clubGifts };
        });
    });

    useMessageEvent<CatalogPublishedMessageEvent>(CatalogPublishedMessageEvent, event =>
    {
        const wasVisible = isVisible;

        resetState();

        if (wasVisible) simpleAlert(LocalizeText('catalog.alert.published.description'), NotificationAlertType.ALERT, null, null, LocalizeText('catalog.alert.published.title'));
    });

    useMessageEvent<BuildersClubFurniCountMessageEvent>(BuildersClubFurniCountMessageEvent, event =>
    {
        const parser = event.getParser();

        setFurniCount(parser.furniCount);

        refreshBuilderStatus();
    });

    useMessageEvent<BuildersClubSubscriptionStatusMessageEvent>(BuildersClubSubscriptionStatusMessageEvent, event =>
    {
        const parser = event.getParser();

        setFurniLimit(parser.furniLimit);
        setMaxFurniLimit(parser.maxFurniLimit);
        setSecondsLeft(parser.secondsLeft);
        setUpdateTime(GetTickerTime());
        setSecondsLeftWithGrace(parser.secondsLeftWithGrace);

        refreshBuilderStatus();
    }); */
}
