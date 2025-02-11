import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HabboGroupDeactivatedMessageParser } from '../../parser';

export class HabboGroupDeactivatedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboGroupDeactivatedMessageParser);
    }

    public getParser(): HabboGroupDeactivatedMessageParser
    {
        return this.parser as HabboGroupDeactivatedMessageParser;
    }
}
