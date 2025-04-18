import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GuildMemberMgmtFailedMessageParser } from '../../parser';

export class GuildMemberMgmtFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuildMemberMgmtFailedMessageParser);
    }

    public getParser(): GuildMemberMgmtFailedMessageParser
    {
        return this.parser as GuildMemberMgmtFailedMessageParser;
    }
}
