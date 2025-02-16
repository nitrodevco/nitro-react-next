import { ICfhTopicData } from './ICfhTopicData';

export interface ICfhCategoryData
{
    name: string;
    topics: ICfhTopicData[];
    disposed: boolean;
}
