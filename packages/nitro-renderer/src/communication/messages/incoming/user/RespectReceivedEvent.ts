import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RespectReceivedParser } from '../../parser';

export class RespectReceivedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RespectReceivedParser);
    }

    public getParser(): RespectReceivedParser
    {
        return this.parser as RespectReceivedParser;
    }
}
