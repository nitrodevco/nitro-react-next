import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ChangeEmailResultParser } from '../../parser';

export class ChangeEmailResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChangeEmailResultParser);
    }

    public getParser(): ChangeEmailResultParser
    {
        return this.parser as ChangeEmailResultParser;
    }
}
