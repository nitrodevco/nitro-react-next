import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GroupBuyDataParser } from '../../parser';

export class GroupBuyDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupBuyDataParser);
    }

    public getParser(): GroupBuyDataParser
    {
        return this.parser as GroupBuyDataParser;
    }
}
