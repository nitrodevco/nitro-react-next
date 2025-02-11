import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { InitDiffieHandshakeParser } from '../../parser';

export class InitDiffieHandshakeEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, InitDiffieHandshakeParser);
    }

    public getParser(): InitDiffieHandshakeParser
    {
        return this.parser as InitDiffieHandshakeParser;
    }
}
