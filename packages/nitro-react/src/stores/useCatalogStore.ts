import { CatalogType, ICatalogNode, ICatalogPage, IOfferOptions, IProductData, IPurchasableOffer, SendMessageComposer } from '#base/api';
import { FrontPageItem, GetCatalogPageComposer, NodeData } from '@nitrodevco/nitro-renderer';
import { create } from 'zustand';

type State = {
    catalogType: string;
    rootNode: ICatalogNode;
    activeNodes: ICatalogNode[];
    expandedNodes: ICatalogNode[];
    offerNodes: Record<string, ICatalogNode[]>;
    searchResult: { searchValue: string; offers: IPurchasableOffer[]; filteredNodes: ICatalogNode[] };
    currentPage: ICatalogPage;
    currentPageId: number;
    currentOffer: IPurchasableOffer;
    currentOfferOptions: IOfferOptions;
    frontPageItems: FrontPageItem[];
    productData: Record<string, IProductData>;
    navigationVisible: boolean;
    productDataNeedsUpdate: boolean;
    catalogNeedsUpdate: boolean;
}

type Actions = {
    processNodeData: (nodeData: NodeData) => void;
    selectNode: (targetNode: ICatalogNode, offerId?: number) => void;
    setSearchResult: (searchValue: string, offers: IPurchasableOffer[], filteredNodes: ICatalogNode[]) => void;
    setCurrentPage: (currentPage: ICatalogPage) => void;
    setCurrentOffer: (currentOffer: IPurchasableOffer) => void;
    updateCurrentOfferOptions: (options: Partial<IOfferOptions>) => void;
    setCurrentOfferOptions: (currentOfferOptions: IOfferOptions) => void;
    setFrontPageItems: (frontPageItems: FrontPageItem[]) => void;
    setProductData: (productData: { [key: string]: IProductData }) => void;
    setProductDataNeedsUpdate: (flag: boolean) => void;
    setCatalogNeedsUpdate: (flag: boolean) => void;
    reset: () => void;
}

const initialState: State = {
    catalogType: CatalogType.NORMAL,
    rootNode: null,
    activeNodes: [],
    expandedNodes: [],
    offerNodes: {},
    searchResult: { searchValue: '', offers: [], filteredNodes: [] },
    currentPage: null,
    currentPageId: -1,
    currentOffer: null,
    currentOfferOptions: null,
    frontPageItems: [],
    productData: {},
    navigationVisible: true,
    productDataNeedsUpdate: true,
    catalogNeedsUpdate: true,
}

export const useCatalogStore = create<State & Actions>(set => ({
    ...initialState,
    processNodeData: (nodeData: NodeData) => set(state =>
    {
        if (!nodeData) return state;

        const offerNodes: { [key: string]: ICatalogNode[] } = {};

        let pageCounter = 0;

        const getCatalogNode = (node: NodeData, depth: number, parent: ICatalogNode) =>
        {
            const catalogNode: ICatalogNode = {
                key: pageCounter,
                depth,
                parent,
                localization: node.localization,
                pageId: node.pageId,
                pageName: node.pageName,
                iconId: node.icon,
                children: [],
                offerIds: node.offerIds,
                isVisible: node.visible,
            };

            pageCounter++;

            for (const offerId of catalogNode.offerIds)
            {
                let nodes = offerNodes[offerId.toString()];

                if (!nodes)
                {
                    nodes = [];
                    offerNodes[offerId.toString()] = nodes;
                }

                nodes.push(catalogNode);
            }

            depth++;

            for (const child of node.children) catalogNode.children.push(getCatalogNode(child, depth, catalogNode));

            return catalogNode;
        };

        const rootNode = getCatalogNode(nodeData, -2, null);

        return { rootNode, offerNodes };
    }),
    selectNode: (targetNode: ICatalogNode, offerId: number = -1) => set(state =>
    {
        //cancelObjectMover();

        if (targetNode.parent === state.rootNode)
        {
            if (targetNode.children.length)
            {
                for (const child of targetNode.children)
                {
                    if (!child.isVisible) continue;

                    targetNode = child;

                    break;
                }
            }
        }

        let activeNodes = state.activeNodes;
        let expandedNodes = state.expandedNodes;

        if (activeNodes?.[activeNodes.length - 1] !== targetNode)
        {
            activeNodes = [];

            let node = targetNode;

            while (node && (node !== state.rootNode))
            {
                activeNodes.push(node);

                node = node.parent;
            }

            activeNodes.reverse();
        }

        const index = expandedNodes?.indexOf(targetNode);

        if (index >= 0)
        {
            expandedNodes = expandedNodes.slice(0, index);
        }
        else
        {
            expandedNodes = [];

            activeNodes.forEach(node =>
            {
                if (!node.children?.length) return;

                expandedNodes.push(node);
            });
        }

        const newState: Partial<State> = { activeNodes, expandedNodes };

        if (targetNode.pageId > -1)
        {
            newState.currentPageId = targetNode.pageId;

            SendMessageComposer(new GetCatalogPageComposer(targetNode.pageId, offerId, state.catalogType));
        }

        return newState;
    }),
    setSearchResult: (searchValue: string, offers: IPurchasableOffer[], filteredNodes: ICatalogNode[]) => set(state =>
    {
        if (!searchValue || !searchValue.length) return { searchResult: null };

        if (searchValue === state.searchResult?.searchValue) return state;

        const searchResult = { searchValue, offers, filteredNodes };

        return { searchResult };
    }),
    setCurrentPage: (currentPage: ICatalogPage) => set({ currentPage, currentOffer: null }),
    setCurrentOffer: (currentOffer: IPurchasableOffer) => set({
        currentOffer, currentOfferOptions: {
            quantity: 1,
            extraData: null,
            extraParamRequired: false,
            previewStuffData: null
        }
    }),
    updateCurrentOfferOptions: (options: Partial<IOfferOptions>) => set(state =>
    {
        return { currentOfferOptions: { ...state.currentOfferOptions, ...options } };
    }),
    setCurrentOfferOptions: (currentOfferOptions: IOfferOptions) => set({ currentOfferOptions }),
    setFrontPageItems: (frontPageItems: FrontPageItem[]) => set({ frontPageItems }),
    setProductData: (productData: { [key: string]: IProductData }) => set({ productData, productDataNeedsUpdate: false }),
    setProductDataNeedsUpdate: (flag: boolean) => set({ productDataNeedsUpdate: flag }),
    setCatalogNeedsUpdate: (flag: boolean) => set({ catalogNeedsUpdate: flag }),
    reset: () => set(initialState)
}));
