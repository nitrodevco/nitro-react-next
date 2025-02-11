import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { JoinedQueueMessageParser } from '../../../parser';

export class JoinedQueueMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, JoinedQueueMessageParser);
    }

    public getParser(): JoinedQueueMessageParser
    {
        return this.parser as JoinedQueueMessageParser;
    }
}
