import { useCatalogStore } from '#base/stores';
import { NitroBadgeImage } from '#themes/default';
import { FC } from 'react';

export const CatalogAddOnBadgeWidgetView: FC<{
}> = props =>
{
    const badgeCode = useCatalogStore(state => state.currentOffer?.badgeCode || '');

    if(!badgeCode || !badgeCode.length) return null;

    return <NitroBadgeImage badgeCode={ badgeCode } />;
}
