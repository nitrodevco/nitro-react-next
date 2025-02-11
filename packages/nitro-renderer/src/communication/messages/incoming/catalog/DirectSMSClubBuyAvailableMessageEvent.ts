import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { DirectSMSClubBuyAvailableMessageParser } from '../../parser';

export class DirectSMSClubBuyAvailableMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, DirectSMSClubBuyAvailableMessageParser);
    }

    public getParser(): DirectSMSClubBuyAvailableMessageParser
    {
        return this.parser as DirectSMSClubBuyAvailableMessageParser;
    }
}
