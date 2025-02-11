import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CallForHelpDisabledNotifyMessageParser } from '../../parser';

export class CallForHelpDisabledNotifyMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CallForHelpDisabledNotifyMessageParser);
    }

    public getParser(): CallForHelpDisabledNotifyMessageParser
    {
        return this.parser as CallForHelpDisabledNotifyMessageParser;
    }
}
