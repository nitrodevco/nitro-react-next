import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UnloadGameMessageParser } from '../../../parser';

export class UnloadGameMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UnloadGameMessageParser);
    }

    public getParser(): UnloadGameMessageParser
    {
        return this.parser as UnloadGameMessageParser;
    }
}
