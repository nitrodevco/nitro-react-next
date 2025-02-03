import { GetLocalizationNameForOffer, ProductType } from '#base/api';
import { FC } from 'react';
import { CatalogPageImageView } from '../common/CatalogPageImageView';
import { CatalogAddOnBadgeWidgetView, CatalogOfferGridWidgetView, CatalogViewOfferWidgetView } from '../widgets';
import { CatalogPriceDisplayWidget } from '../widgets/CatalogPriceDisplayWidget';
import { CatalogLayoutProps } from './CatalogLayoutProps';

export const CatalogDefaultLayoutView: FC<CatalogLayoutProps> = props =>
{
    const { page = null, roomPreviewer = null, currentOffer = null } = props;

    if(!page) return null;

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-2 overflow-hidden">
                <CatalogOfferGridWidgetView />
            </div>
            <div className="flex flex-col col-span-5 gap-1 overflow-hidden">
                { (currentOffer === null) &&
                    <div className="flex flex-col items-center justify-center grow">
                        <CatalogPageImageView page={ page } imageIndex={ 1 } />
                    </div> }
                { (currentOffer !== null) &&
                    <>
                        { (currentOffer.product.productType !== ProductType.BADGE) &&
                            <>
                                <CatalogViewOfferWidgetView roomPreviewer={ roomPreviewer } />
                                <CatalogAddOnBadgeWidgetView />
                            </> }
                        { (currentOffer.product.productType === ProductType.BADGE) &&
                            <>
                                <CatalogAddOnBadgeWidgetView />
                            </> }
                        <div className="flex flex-col grow">
                            <span className="text-base truncate grow">{ GetLocalizationNameForOffer(currentOffer) }</span>
                            <div className="flex justify-between">
                                <CatalogPriceDisplayWidget />
                            </div>
                        </div>
                    </> }
            </div>
        </div>
    )
}
