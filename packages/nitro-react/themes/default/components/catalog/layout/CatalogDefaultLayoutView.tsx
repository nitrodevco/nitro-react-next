import { ProductTypeEnum } from '#base/api';
import { useOfferLocalization } from '#base/hooks';
import { FC } from 'react';
import { CatalogPageImageView, CatalogPageTextView } from '../common';
import { CatalogAddOnBadgeWidgetView, CatalogOfferGridWidgetView, CatalogPriceDisplayWidget, CatalogPurchaseWidgetView, CatalogViewOfferWidgetView } from '../widgets';
import { CatalogLayoutProps } from './CatalogLayoutProps';

export const CatalogDefaultLayoutView: FC<CatalogLayoutProps> = props =>
{
    const { page = null, roomPreviewer = null, currentOffer = null } = props;
    const offerLocalization = useOfferLocalization(currentOffer);

    if (!page) return null;

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-2 overflow-hidden">
                <CatalogOfferGridWidgetView />
            </div>
            <div className="flex flex-col col-span-5 gap-1 overflow-hidden">
                {(currentOffer === null) &&
                    <div className="flex flex-col items-center justify-center grow gap-2">
                        <CatalogPageImageView page={page} imageIndex={1} />
                        <CatalogPageTextView className="text-center" page={page} textIndex={0} />
                    </div>}
                {(currentOffer !== null) &&
                    <>
                        {(currentOffer.product.productType !== ProductTypeEnum.Badge) &&
                            <>
                                <CatalogViewOfferWidgetView roomPreviewer={roomPreviewer} />
                                <CatalogAddOnBadgeWidgetView />
                            </>}
                        {(currentOffer.product.productType === ProductTypeEnum.Badge) &&
                            <>
                                <CatalogAddOnBadgeWidgetView />
                            </>}
                        <div className="flex flex-col grow">
                            <span className="text-base truncate grow">
                                {offerLocalization.name}
                            </span>
                            <div className="flex flex-col justify-between gap-1">
                                <div className="flex justify-end">
                                    <CatalogPriceDisplayWidget />
                                </div>
                                <CatalogPurchaseWidgetView />
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    )
}
