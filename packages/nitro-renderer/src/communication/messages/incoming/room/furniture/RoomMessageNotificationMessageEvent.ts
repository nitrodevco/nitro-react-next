import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomMessageNotificationMessageParser } from '../../../parser';

export class RoomMessageNotificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomMessageNotificationMessageParser);
    }

    public getParser(): RoomMessageNotificationMessageParser
    {
        return this.parser as RoomMessageNotificationMessageParser;
    }
}
