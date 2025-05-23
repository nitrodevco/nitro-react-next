import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { NotificationDialogMessageParser } from '../../parser';

export class NotificationDialogMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NotificationDialogMessageParser);
    }

    public getParser(): NotificationDialogMessageParser
    {
        return this.parser as NotificationDialogMessageParser;
    }
}
