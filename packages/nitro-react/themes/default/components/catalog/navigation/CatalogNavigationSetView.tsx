import { ICatalogNode } from '#base/api';
import { FC } from 'react';
import { CatalogNavigationItemView } from './CatalogNavigationItemView';

export const CatalogNavigationSetView: FC<{
    node: ICatalogNode;
    isChild?: boolean;
    activeNodes?: ICatalogNode[];
    expandedNodes?: ICatalogNode[];
    selectNode: (targetNode: ICatalogNode) => void;
}> = props =>
{
    const { node = null, isChild = false, activeNodes = null, expandedNodes = null, selectNode = null } = props;
    
    return (
        <>
            { node && (node.children.length > 0) && node.children.map((child, index) =>
            {
                if(!child.isVisible) return null;

                return <CatalogNavigationItemView key={ child.key } node={ child } isChild={ isChild } activeNodes={ activeNodes } expandedNodes={ expandedNodes } selectNode={ selectNode } />;
            }) }
        </>
    );
}
