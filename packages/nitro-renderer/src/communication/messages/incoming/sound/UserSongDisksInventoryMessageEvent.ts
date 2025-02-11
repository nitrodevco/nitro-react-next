import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserSongDisksInventoryMessageParser } from '../../parser';

export class UserSongDisksInventoryMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSongDisksInventoryMessageParser);
    }

    public getParser(): UserSongDisksInventoryMessageParser
    {
        return this.parser as UserSongDisksInventoryMessageParser;
    }
}
