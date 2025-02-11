import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { IssueCloseNotificationMessageParser } from '../../parser';

export class IssueCloseNotificationMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IssueCloseNotificationMessageParser);
    }

    public getParser(): IssueCloseNotificationMessageParser
    {
        return this.parser as IssueCloseNotificationMessageParser;
    }
}
