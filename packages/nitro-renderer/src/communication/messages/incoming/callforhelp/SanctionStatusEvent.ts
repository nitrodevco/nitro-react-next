import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { SanctionStatusMessageParser } from '../../parser';

export class SanctionStatusEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SanctionStatusMessageParser);
    }

    public getParser(): SanctionStatusMessageParser
    {
        return this.parser as SanctionStatusMessageParser;
    }
}
