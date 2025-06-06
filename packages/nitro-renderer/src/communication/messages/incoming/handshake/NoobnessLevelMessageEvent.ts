import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { NoobnessLevelMessageParser } from '../../parser';

export class NoobnessLevelMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NoobnessLevelMessageParser);
    }

    public getParser(): NoobnessLevelMessageParser
    {
        return this.parser as NoobnessLevelMessageParser;
    }
}
