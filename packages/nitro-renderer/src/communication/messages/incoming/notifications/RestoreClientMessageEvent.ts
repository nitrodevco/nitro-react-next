import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RestoreClientMessageParser } from '../../parser';

export class RestoreClientMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RestoreClientMessageParser);
    }

    public getParser(): RestoreClientMessageParser
    {
        return this.parser as RestoreClientMessageParser;
    }
}
