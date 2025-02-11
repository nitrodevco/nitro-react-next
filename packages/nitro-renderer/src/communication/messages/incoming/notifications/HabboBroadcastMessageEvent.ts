import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { HabboBroadcastMessageParser } from '../../parser';

export class HabboBroadcastMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, HabboBroadcastMessageParser);
    }

    public getParser(): HabboBroadcastMessageParser
    {
        return this.parser as HabboBroadcastMessageParser;
    }
}
