import { useMessageEvent } from '#base/hooks';
import { useCatalogStore } from '#base/stores';
import { CatalogPagesListEvent } from '@nitrots/nitro-renderer';
import { useShallow } from 'zustand/shallow';

export const useCatalogMessages = () =>
{
    const [
        processNodeData
    ] = useCatalogStore(
        useShallow(state => [
            state.processNodeData
        ]));

    useMessageEvent<CatalogPagesListEvent>(CatalogPagesListEvent, event =>
    {
        const parser = event.getParser();

        if (parser.root) processNodeData(parser.root);
    });

    /* useMessageEvent<CatalogPageMessageEvent>(CatalogPageMessageEvent, event =>
    {
        const parser = event.getParser();

        if (parser.catalogType !== currentType) return;

        const purchasableOffers: IPurchasableOffer[] = [];

        for (const offer of parser.offers)
        {
            const products: IProduct[] = [];
            const productData = GetProductDataForLocalization(offer.localizationId);

            for (const product of offer.products)
            {
                const furnitureData = GetFurnitureData(product.furniClassId, product.productType);

                products.push(new Product(product.productType, product.furniClassId, product.extraParam, product.productCount, productData, furnitureData, product.uniqueLimitedItem, product.uniqueLimitedSeriesSize, product.uniqueLimitedItemsLeft));
            }

            if (!products.length) continue;

            const purchasableOffer = new Offer(offer.offerId, offer.localizationId, offer.rent, offer.priceCredits, offer.priceActivityPoints, offer.priceActivityPointsType, offer.giftable, offer.clubLevel, products, offer.bundlePurchaseAllowed);

            if ((currentType === CatalogType.NORMAL) || ((purchasableOffer.pricingModel !== Offer.PRICING_MODEL_BUNDLE) && (purchasableOffer.pricingModel !== Offer.PRICING_MODEL_MULTI))) purchasableOffers.push(purchasableOffer);
        }

        if (parser.frontPageItems && parser.frontPageItems.length) setFrontPageItems(parser.frontPageItems);

        setIsBusy(false);

        if (pageId === parser.pageId)
        {
            showCatalogPage(parser.pageId, parser.layoutCode, new PageLocalization(parser.localization.images.concat(), parser.localization.texts.concat()), purchasableOffers, parser.offerId, parser.acceptSeasonCurrencyAsCredits);
        }
    });

    useMessageEvent<PurchaseOKMessageEvent>(PurchaseOKMessageEvent, event =>
    {
        const parser = event.getParser();

        DispatchUiEvent(new CatalogPurchasedEvent(parser.offer));
    });

    useMessageEvent<PurchaseErrorMessageEvent>(PurchaseErrorMessageEvent, event =>
    {
        const parser = event.getParser();

        DispatchUiEvent(new CatalogPurchaseFailureEvent(parser.code));
    });

    useMessageEvent<PurchaseNotAllowedMessageEvent>(PurchaseNotAllowedMessageEvent, event =>
    {
        const parser = event.getParser();

        DispatchUiEvent(new CatalogPurchaseNotAllowedEvent(parser.code));
    });

    useMessageEvent<LimitedEditionSoldOutEvent>(LimitedEditionSoldOutEvent, event =>
    {
        const parser = event.getParser();

        DispatchUiEvent(new CatalogPurchaseSoldOutEvent());
    });

    useMessageEvent<ProductOfferEvent>(ProductOfferEvent, event =>
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

        if (offer.product && (offer.product.productType === ProductTypeEnum.WALL))
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
