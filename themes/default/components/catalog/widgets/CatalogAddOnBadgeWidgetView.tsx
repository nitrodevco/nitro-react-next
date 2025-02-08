import { useCatalogStore } from '#base/stores/useCatalogStore.ts';
import { FC } from 'react';
import { NitroBadgeImage } from '../../../layout/NitroBadgeImage';

export const CatalogAddOnBadgeWidgetView: FC<{
}> = props =>
{
    const badgeCode = useCatalogStore(state => state.currentOffer?.badgeCode || '');

    if(!badgeCode || !badgeCode.length) return null;

    return <NitroBadgeImage badgeCode={ badgeCode } />;
}
