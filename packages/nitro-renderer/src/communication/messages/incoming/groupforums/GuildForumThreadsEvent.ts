import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GuildForumThreadsParser } from '../../parser';

export class GuildForumThreadsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuildForumThreadsParser);
    }

    public getParser(): GuildForumThreadsParser
    {
        return this.parser as GuildForumThreadsParser;
    }
}
