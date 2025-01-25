export interface ICatalogNode
{
    depth: number;
    localization: string;
    pageId: number;
    pageName: string;
    iconId: number;
    children: ICatalogNode[];
    offerIds: number[];
    parent: ICatalogNode;
    isVisible: boolean;
}
