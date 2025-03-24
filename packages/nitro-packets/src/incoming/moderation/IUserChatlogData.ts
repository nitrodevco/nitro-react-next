import { IChatRecordData } from './IChatRecordData';

export interface IUserChatlogData
{
    userId: number;
    userName: string;
    roomChatlogs: IChatRecordData[];
}
