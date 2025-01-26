import { LocalizeText, SendMessageComposer } from '#base/api';
import { useRoomPreviewer } from '#base/hooks';
import { useCatalogStore, useVisibilityStore } from '#base/stores';
import { classNames } from '#base/utils';
import { NitroCard, NitroCatalogIcon } from '#themes/default/layout';
import { BuildersClubQueryFurniCountMessageComposer, GetCatalogIndexComposer, GetClubGiftInfo, GetGiftWrappingConfigurationComposer } from '@nitrots/nitro-renderer';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { CatalogNavigationView, CatalogSearchView } from './navigation';

export const CatalogView: FC<{
    catalogType: string
}> = props =>
{
    const { catalogType = '' } = props;
    const { roomPreviewer = null } = useRoomPreviewer();
    const [
        rootNode,
        activeNodes,
        navigationVisible,
        catalogNeedsUpdate,
        selectNode,
        setCatalogNeedsUpdate
    ] = useCatalogStore(
        useShallow(state => [
            state.rootNode,
            state.activeNodes,
            state.navigationVisible,
            state.catalogNeedsUpdate,
            state.selectNode,
            state.setCatalogNeedsUpdate
        ]));

    const hideCatalog = () => useVisibilityStore.setState({ catalogVisible: false });

    useEffect(() =>
    {
        if(!catalogNeedsUpdate) return;

        SendMessageComposer(new GetGiftWrappingConfigurationComposer());
        SendMessageComposer(new GetClubGiftInfo());
        SendMessageComposer(new GetCatalogIndexComposer(catalogType));
        SendMessageComposer(new BuildersClubQueryFurniCountMessageComposer());

        setCatalogNeedsUpdate(false);
    }, [ catalogNeedsUpdate, catalogType ]);

    if(!rootNode) return null;

    return (
        <NitroCard
            className="w-catalog-w h-catalog-h min-w-catalog-w min-h-catalog-h"
            uniqueKey="catalog">
            <NitroCard.Header
                headerText={ LocalizeText('catalog.title') }
                onCloseClick={ hideCatalog } />
            <NitroCard.Tabs>
                { rootNode && (rootNode.children.length > 0) && rootNode.children.map(child =>
                    {
                        if(!child.isVisible) return null;

                        return (
                            <NitroCard.TabItem
                                key={ child.pageId }
                                isActive={ (activeNodes.indexOf(child) >= 0) }
                                onClick={ event => selectNode(child) }>
                                <NitroCatalogIcon icon={ child.iconId } />
                                { child.localization }
                            </NitroCard.TabItem>
                        );
                    }) }
                </NitroCard.Tabs>
            <NitroCard.Content>
                <div className="grid h-full grid-cols-12 gap-2">
                    { navigationVisible &&
                        <div className="flex flex-col col-span-3 gap-2 overflow-hidden">
                            <CatalogSearchView />
                            <CatalogNavigationView node={ activeNodes?.[0] } />
                        </div> }
                    <div className={ classNames("flex flex-col", navigationVisible ? 'col-span-9' : 'col-span-12') }>
                        right
                    </div>
                </div>
            </NitroCard.Content>
        </NitroCard>
    );
}
