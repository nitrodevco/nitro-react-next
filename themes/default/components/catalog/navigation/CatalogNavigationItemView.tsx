import { ICatalogNode } from '#base/api';
import { classNames } from '#base/utils';
import { NitroCatalogIcon } from '#themes/default';
import { FC, useEffect, useRef } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { CatalogNavigationSetView } from './CatalogNavigationSetView';

export const CatalogNavigationItemView: FC<{
    node: ICatalogNode;
    isChild?: boolean;
    activeNodes?: ICatalogNode[];
    expandedNodes?: ICatalogNode[];
    selectNode: (targetNode: ICatalogNode) => void;
}> = props =>
{
    const { node = null, isChild = false, activeNodes = null, expandedNodes = null, selectNode = null } = props;
    const hasChildren = (node.children?.length > 0);
    const isActive = (activeNodes?.indexOf(node) >= 0);
    const isExpanded = (expandedNodes?.indexOf(node) >= 0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        if(!elementRef?.current) return;

        node.element = elementRef.current;

        return () =>
        {
            node.element = null;
        }
    }, [ node, activeNodes ]);
    
    return (
        <div
            ref={ elementRef }
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
                className={ classNames(`cursor-pointer overflow-hidden w-full z-1`, isActive && 'rounded-md bg-[#ECECEC]', (isExpanded && hasChildren) && 'mb-0.5') }
                onClick={ () => selectNode(node) }>
                <div
                    className="flex items-center gap-1 px-1 py-0.5 w-full">
                    <div className="flex items-center justify-center w-[20px] h-[20px]">
                        <NitroCatalogIcon icon={ node.iconId } />
                    </div>
                    <p className="truncate text-sm grow">{ node.localization }</p>
                    { hasChildren &&
                        <>
                            { isExpanded && <FaCaretUp className="fa-icon text-sm" /> }
                            { !isExpanded && <FaCaretDown className="fa-icon text-sm" /> }
                        </> }
                </div>
            </div>
            { isExpanded && hasChildren &&
                <CatalogNavigationSetView node={ node } isChild={ true } activeNodes={ activeNodes } expandedNodes={ expandedNodes } selectNode={ selectNode } /> }
        </div>
    );
}
