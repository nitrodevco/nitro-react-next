import { useOfferLocalization } from '#base/hooks/index.ts';
import { useCatalogStore } from '#base/stores/useCatalogStore.ts';
import { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { CatalogPageImageView, CatalogPageTextView } from '../common';
import { CatalogOfferGridWidgetView, CatalogPriceDisplayWidget, CatalogPurchaseWidgetView, CatalogViewOfferWidgetView } from '../widgets';
import { CatalogLayoutProps } from './CatalogLayoutProps';

export const CatalogTrophiesLayoutView: FC<CatalogLayoutProps> = props =>
{
    const { page = null, roomPreviewer = null, currentOffer = null } = props;
    const [ trophyText, setTrophyText ] = useState<string>('');

    const offerLocalization = useOfferLocalization(currentOffer);

    const [
        updateCurrentOfferOptions
    ] = useCatalogStore(
        useShallow(state => [
            state.updateCurrentOfferOptions
        ]));

    useEffect(() => {
        if(!currentOffer) return;

        updateCurrentOfferOptions({
            extraData: (trophyText || '')
        });
    }, [currentOffer, trophyText, updateCurrentOfferOptions]);

    return (
        <div className="grid h-full grid-cols-12 gap-2">
            <div className="flex flex-col col-span-7 gap-2 overflow-hidden">
                <CatalogOfferGridWidgetView />
                <textarea className="w-full grow p-2 text-sm bg-gray-100 h-1/2" value={ trophyText || '' } onChange={ event => setTrophyText(event.target.value) } />
            </div>
            <div className="flex flex-col col-span-5 gap-1 overflow-hidden">
                {(currentOffer === null) &&
                    <div className="flex flex-col items-center justify-center grow gap-2">
                        <CatalogPageImageView page={page} imageIndex={1} />
                        <CatalogPageTextView className="text-center" page={page} textIndex={0} />
                    </div>}
                {(currentOffer !== null) &&
                    <>
                        <CatalogViewOfferWidgetView roomPreviewer={roomPreviewer} />
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
