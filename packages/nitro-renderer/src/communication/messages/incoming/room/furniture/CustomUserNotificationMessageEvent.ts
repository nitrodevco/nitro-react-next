import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CustomUserNotificationMessageParser } from '../../../parser';

export class CustomUserNotificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CustomUserNotificationMessageParser);
    }

    public getParser(): CustomUserNotificationMessageParser
    {
        return this.parser as CustomUserNotificationMessageParser;
    }
}
