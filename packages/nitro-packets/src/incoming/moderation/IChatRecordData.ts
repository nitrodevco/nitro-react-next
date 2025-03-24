import { ChatRecordTypeEnum } from './ChatRecordTypeEnum';
import { IChatLineData } from './IChatLineData';

export interface IChatRecordData
{
    recordType: ChatRecordTypeEnum;
    context: Record<string, boolean | number | string>;
    chatlog: IChatLineData[];
}
