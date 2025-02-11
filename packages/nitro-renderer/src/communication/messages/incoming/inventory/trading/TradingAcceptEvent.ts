import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { TradingAcceptParser } from '../../../parser';

export class TradingAcceptEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TradingAcceptParser);
    }

    public get userID(): number
    {
        return this.getParser().userID;
    }

    public get userAccepts(): boolean
    {
        return this.getParser().userAccepts;
    }

    public getParser(): TradingAcceptParser
    {
        return this.parser as TradingAcceptParser;
    }
}
