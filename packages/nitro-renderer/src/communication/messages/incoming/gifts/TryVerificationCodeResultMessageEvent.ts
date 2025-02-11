import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { TryVerificationCodeResultParser } from '../../parser';

export class TryVerificationCodeResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TryVerificationCodeResultParser);
    }

    public getParser(): TryVerificationCodeResultParser
    {
        return this.parser as TryVerificationCodeResultParser;
    }
}
