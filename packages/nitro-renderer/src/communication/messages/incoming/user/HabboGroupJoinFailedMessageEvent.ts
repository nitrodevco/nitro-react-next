import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HabboGroupJoinFailedMessageParser } from '../../parser';

export class HabboGroupJoinFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupJoinFailedMessageParser);
    }

    public getParser(): HabboGroupJoinFailedMessageParser
    {
        return this.parser as HabboGroupJoinFailedMessageParser;
    }
}
