import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PetSupplementedNotificationParser } from '../../parser';

export class PetSupplementedNotificationEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetSupplementedNotificationParser);
    }

    public getParser(): PetSupplementedNotificationParser
    {
        return this.parser as PetSupplementedNotificationParser;
    }
}
