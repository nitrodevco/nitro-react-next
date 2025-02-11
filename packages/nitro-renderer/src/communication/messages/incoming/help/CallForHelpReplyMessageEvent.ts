import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CallForHelpReplyMessageParser } from '../../parser';

export class CallForHelpReplyMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpReplyMessageParser);
    }

    public getParser(): CallForHelpReplyMessageParser
    {
        return this.parser as CallForHelpReplyMessageParser;
    }
}
