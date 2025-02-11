import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FriendListFragmentParser } from '../../parser';

export class FriendListFragmentEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FriendListFragmentParser);
    }

    public getParser(): FriendListFragmentParser
    {
        return this.parser as FriendListFragmentParser;
    }
}
