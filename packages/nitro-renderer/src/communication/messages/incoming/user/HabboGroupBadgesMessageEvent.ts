import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HabboGroupBadgesMessageParser } from '../../parser';

export class HabboGroupBadgesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupBadgesMessageParser);
    }

    public getParser(): HabboGroupBadgesMessageParser
    {
        return this.parser as HabboGroupBadgesMessageParser;
    }
}
