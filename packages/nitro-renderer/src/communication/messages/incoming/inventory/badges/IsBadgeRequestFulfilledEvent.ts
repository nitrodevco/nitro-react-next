import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { IsBadgeRequestFulfilledParser } from '../../../parser';

export class IsBadgeRequestFulfilledEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IsBadgeRequestFulfilledParser);
    }

    public getParser(): IsBadgeRequestFulfilledParser
    {
        return this.parser as IsBadgeRequestFulfilledParser;
    }
}
