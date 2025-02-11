import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomFilterSettingsMessageParser } from '../../parser';

export class RoomFilterSettingsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomFilterSettingsMessageParser);
    }

    public getParser(): RoomFilterSettingsMessageParser
    {
        return this.parser as RoomFilterSettingsMessageParser;
    }
}
