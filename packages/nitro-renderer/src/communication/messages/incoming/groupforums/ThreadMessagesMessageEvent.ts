import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ThreadMessagesMessageParser } from '../../parser';

export class ThreadMessagesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ThreadMessagesMessageParser);
    }

    public getParser(): ThreadMessagesMessageParser
    {
        return this.parser as ThreadMessagesMessageParser;
    }
}
