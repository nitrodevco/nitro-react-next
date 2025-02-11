import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { BotInventoryMessageParser } from '../../parser';

export class BotInventoryMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotInventoryMessageParser);
    }

    public getParser(): BotInventoryMessageParser
    {
        return this.parser as BotInventoryMessageParser;
    }
}
