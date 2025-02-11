import { IObjectData } from '@nitrodevco/nitro-renderer';

export interface IOfferOptions
{
    quantity?: number;
    extraData?: string;
    extraParamRequired?: boolean;
    previewStuffData?: IObjectData;
}
