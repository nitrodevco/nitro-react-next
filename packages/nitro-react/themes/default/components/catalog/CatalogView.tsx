import { useCatalogLogic, useLocalization, useRoomPreviewer } from '#base/hooks';
import { useCatalogStore, useVisibilityStore } from '#base/stores';
import { classNames } from '#base/utils';
import { NitroCard, NitroCatalogIcon } from '#themes/default';
import { FC, useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { CatalogPageView } from './CatalogPageView';
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
            currentPage,
            currentOffer,
            navigationVisible,
            selectNode,
        ] = useCatalogStore(
            useShallow(state => [
                state.rootNode,
                state.activeNodes,
                state.currentPage,
                state.currentOffer,
                state.navigationVisible,
                state.selectNode,
            ]));
        const translation = useLocalization();

        useCatalogLogic();

        useEffect(() =>
        {
            if (!rootNode?.children?.length || activeNodes?.length) return;

            for (const child of rootNode.children)
            {
                if (!child.isVisible) continue;

                selectNode(child);

                return;
            }
        }, [activeNodes, rootNode]);

        if (!rootNode) return null;

        const hideCatalog = () => useVisibilityStore.setState({ catalogVisible: false });

        return (
            <NitroCard
                className="w-catalog-w h-catalog-h min-w-catalog-w min-h-catalog-h"
                uniqueKey="catalog">
                <NitroCard.Header
                    headerText={translation('catalog.title')}
                    onCloseClick={hideCatalog} />
                <NitroCard.Tabs>
                    {rootNode && (rootNode.children.length > 0) && rootNode.children.map(child =>
                    {
                        if (!child.isVisible) return null;

                        return (
                            <NitroCard.TabItem
                                key={child.key}
                                isActive={(activeNodes.indexOf(child) >= 0)}
                                onClick={event => selectNode(child)}>
                                <div className="flex items-center justify-center w-[20px] h-[20px]">
                                    <NitroCatalogIcon icon={child.iconId} />
                                </div>
                                {child.localization}
                            </NitroCard.TabItem>
                        );
                    })}
                </NitroCard.Tabs>
                <NitroCard.Content>
                    <div className="grid h-full grid-cols-12 gap-2">
                        {navigationVisible &&
                            <div className="flex flex-col col-span-3 gap-2 overflow-hidden">
                                <CatalogSearchView />
                                <CatalogNavigationView node={activeNodes?.[0]} />
                            </div>}
                        <div className={classNames("flex flex-col overflow-hidden", navigationVisible ? 'col-span-9' : 'col-span-12')}>
                            <CatalogPageView page={currentPage} roomPreviewer={roomPreviewer} currentOffer={currentOffer} />
                        </div>
                    </div>
                </NitroCard.Content>
            </NitroCard>
        );
    }
