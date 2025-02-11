import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { BotForceOpenContextMenuParser } from '../../../parser';

export class BotForceOpenContextMenuEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotForceOpenContextMenuParser);
    }

    public getParser(): BotForceOpenContextMenuParser
    {
        return this.parser as BotForceOpenContextMenuParser;
    }
}
