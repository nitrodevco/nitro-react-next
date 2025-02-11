import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { WelcomeGiftChangeEmailResultParser } from '../../parser';

export class WelcomeGiftChangeEmailResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WelcomeGiftChangeEmailResultParser);
    }

    public getParser(): WelcomeGiftChangeEmailResultParser
    {
        return this.parser as WelcomeGiftChangeEmailResultParser;
    }
}
