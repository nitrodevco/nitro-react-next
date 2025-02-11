import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PostThreadMessageParser } from '../../parser';

export class PostThreadMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PostThreadMessageParser);
    }

    public getParser(): PostThreadMessageParser
    {
        return this.parser as PostThreadMessageParser;
    }
}
