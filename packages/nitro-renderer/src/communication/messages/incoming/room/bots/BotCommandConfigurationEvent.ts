import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { BotCommandConfigurationParser } from '../../../parser';

export class BotCommandConfigurationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BotCommandConfigurationParser);
    }

    public getParser(): BotCommandConfigurationParser
    {
        return this.parser as BotCommandConfigurationParser;
    }
}
