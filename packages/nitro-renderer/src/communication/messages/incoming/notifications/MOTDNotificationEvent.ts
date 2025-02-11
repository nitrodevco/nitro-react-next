import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MOTDNotificationParser } from '../../parser';

export class MOTDNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MOTDNotificationParser);
    }

    public getParser(): MOTDNotificationParser
    {
        return this.parser as MOTDNotificationParser;
    }
}
