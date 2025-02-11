import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PostMessageMessageParser } from '../../parser';

export class PostMessageMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PostMessageMessageParser);
    }

    public getParser(): PostMessageMessageParser
    {
        return this.parser as PostMessageMessageParser;
    }
}
