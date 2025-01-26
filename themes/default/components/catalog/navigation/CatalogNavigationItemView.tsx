import { ICatalogNode } from '#base/api';
import { classNames } from '#base/utils';
import { NitroCatalogIcon } from '#themes/default/layout';
import { FC } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export const CatalogNavigationItemView: FC<{
    node: ICatalogNode;
    isChild?: boolean;
    isNodeActive: (node: ICatalogNode) => boolean;
    isNodeExpanded: (node: ICatalogNode) => boolean;
    selectNode: (targetNode: ICatalogNode) => void;
}> = props =>
{
    const { node = null, isChild = false, isNodeActive = null, isNodeExpanded = null, selectNode = null } = props;
    const isActive = isNodeActive(node);
    const isExpanded = isNodeExpanded(node);
    const hasChildren = (node.children?.length > 0);
    
    return (
        <div
            className="flex flex-col"
            style={ isChild ? {
                position: 'relative',
                width: 'calc(100% - 2px)',
                left: '2px',
                paddingLeft: '4px',
            } : {} }>
            { isChild &&
                <div
                    className="absolute top-[-4px] left-0 h-[calc(100%+4px)] w-[2px] bg-[#b6bec5]" /> }
            <div
                className={ classNames(`flex items-center justify-center cursor-pointer gap-1 p-0.5 overflow-hidden w-full z-[1]`, isActive && 'rounded bg-[#ECECEC]', (isExpanded && hasChildren) && 'mb-0.5') }
                onClick={ () => selectNode(node) }>
                <NitroCatalogIcon icon={ node.iconId } />
                <p className="truncate text-sm w-full">{ node.localization }</p>
                { hasChildren &&
                    <>
                        { isExpanded && <FaCaretUp className="fa-icon text-sm" /> }
                        { !isExpanded && <FaCaretDown className="fa-icon text-sm" /> }
                    </> }
            </div>
            { isExpanded && hasChildren &&
                <CatalogNavigationSetView node={ node } isChild={ true } isNodeActive={ isNodeActive } isNodeExpanded={ isNodeExpanded } selectNode={ selectNode } /> }
        </div>
    );
}
