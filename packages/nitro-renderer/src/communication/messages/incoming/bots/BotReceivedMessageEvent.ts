import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { BotReceivedMessageParser } from '../../parser';

export class BotReceivedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotReceivedMessageParser);
    }

    public getParser(): BotReceivedMessageParser
    {
        return this.parser as BotReceivedMessageParser;
    }
}
