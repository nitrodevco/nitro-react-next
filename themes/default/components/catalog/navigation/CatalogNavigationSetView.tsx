import { ICatalogNode } from '#base/api';
import { FC } from 'react';
import { CatalogNavigationItemView } from './CatalogNavigationItemView';

export const CatalogNavigationSetView: FC<{
    node: ICatalogNode;
    isChild?: boolean;
    isNodeActive: (node: ICatalogNode) => boolean;
    isNodeExpanded: (node: ICatalogNode) => boolean;
    selectNode: (targetNode: ICatalogNode) => void;
}> = props =>
{
    const { node = null, isChild = false, isNodeActive = null, isNodeExpanded = null, selectNode = null } = props;
    
    return (
        <>
            { node && (node.children.length > 0) && node.children.map((child, index) =>
            {
                if(!child.isVisible) return null;
                    
                return <CatalogNavigationItemView key={ index } node={ child } isChild={ isChild } isNodeActive={ isNodeActive } isNodeExpanded={ isNodeExpanded } selectNode={ selectNode } />
            }) }
        </>
    );
}
