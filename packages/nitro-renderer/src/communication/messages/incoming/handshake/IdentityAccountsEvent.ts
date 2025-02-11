import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { IdentityAccountsParser } from '../../parser';

export class IdentityAccountsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IdentityAccountsParser);
    }

    public getParser(): IdentityAccountsParser
    {
        return this.parser as IdentityAccountsParser;
    }
}
