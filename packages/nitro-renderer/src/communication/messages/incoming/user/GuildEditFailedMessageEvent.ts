import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GuildEditFailedMessageParser } from '../../parser';

export class GuildEditFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuildEditFailedMessageParser);
    }

    public getParser(): GuildEditFailedMessageParser
    {
        return this.parser as GuildEditFailedMessageParser;
    }
}
