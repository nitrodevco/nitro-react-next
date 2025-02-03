import { useCatalogStore } from '#base/stores/useCatalogStore.ts';
import { NitroBadgeImage } from '#themes/default/layout/NitroBadgeImage.tsx';
import { FC } from 'react';

export const CatalogAddOnBadgeWidgetView: FC<{
}> = props =>
{
    const badgeCode = useCatalogStore(state => state.currentOffer?.badgeCode || '');

    if(!badgeCode || !badgeCode.length) return null;

    return <NitroBadgeImage badgeCode={ badgeCode } />;
}
