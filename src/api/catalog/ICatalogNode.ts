import { Key } from 'react';

export interface ICatalogNode
{
    key: Key;
    depth: number;
    localization: string;
    pageId: number;
    pageName: string;
    iconId: number;
    children: ICatalogNode[];
    offerIds: number[];
    parent: ICatalogNode;
    isVisible: boolean;
    element?: HTMLDivElement;
}
