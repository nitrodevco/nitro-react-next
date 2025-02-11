import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UpdateThreadMessageParser } from '../../parser';

export class UpdateThreadMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UpdateThreadMessageParser);
    }

    public getParser(): UpdateThreadMessageParser
    {
        return this.parser as UpdateThreadMessageParser;
    }
}
