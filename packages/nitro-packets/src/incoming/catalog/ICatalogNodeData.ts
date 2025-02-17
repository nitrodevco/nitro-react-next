export interface ICatalogNodeData
{
    visible: boolean;
    icon: number;
    pageId: number;
    pageName: string;
    localization: string;
    children: ICatalogNodeData[];
    offerIds: number[];
}
