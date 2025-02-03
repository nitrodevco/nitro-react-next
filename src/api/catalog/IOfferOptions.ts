import { IObjectData } from '@nitrots/nitro-renderer';

export interface IOfferOptions
{
    quantity?: number;
    extraData?: string;
    extraParamRequired?: boolean;
    previewStuffData?: IObjectData;
}
