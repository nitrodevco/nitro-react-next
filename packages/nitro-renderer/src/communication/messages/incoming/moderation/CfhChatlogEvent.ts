import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CfhChatlogMessageParser } from '../../parser';

export class CfhChatlogEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CfhChatlogMessageParser);
    }

    public getParser(): CfhChatlogMessageParser
    {
        return this.parser as CfhChatlogMessageParser;
    }
}
