import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CompleteDiffieHandshakeParser } from '../../parser';

export class CompleteDiffieHandshakeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompleteDiffieHandshakeParser);
    }

    public getParser(): CompleteDiffieHandshakeParser
    {
        return this.parser as CompleteDiffieHandshakeParser;
    }
}
