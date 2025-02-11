import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ForumDataMessageParser } from '../../parser';

export class ForumDataMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ForumDataMessageParser);
    }

    public getParser(): ForumDataMessageParser
    {
        return this.parser as ForumDataMessageParser;
    }
}
