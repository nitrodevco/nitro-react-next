import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AuthenticatedParser } from '../../parser';

export class AuthenticatedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AuthenticatedParser);
    }

    public getParser(): AuthenticatedParser
    {
        return this.parser as AuthenticatedParser;
    }
}
