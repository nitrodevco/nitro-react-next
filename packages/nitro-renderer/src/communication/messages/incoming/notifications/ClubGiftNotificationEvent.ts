import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ClubGiftNotificationParser } from '../../parser';

export class ClubGiftNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ClubGiftNotificationParser);
    }

    public getParser(): ClubGiftNotificationParser
    {
        return this.parser as ClubGiftNotificationParser;
    }
}
