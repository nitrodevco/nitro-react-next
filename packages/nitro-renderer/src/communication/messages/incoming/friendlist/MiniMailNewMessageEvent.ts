import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MiniMailNewMessageParser } from '../../parser';

export class MiniMailNewMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MiniMailNewMessageParser);
    }

    public getParser(): MiniMailNewMessageParser
    {
        return this.parser as MiniMailNewMessageParser;
    }
}
