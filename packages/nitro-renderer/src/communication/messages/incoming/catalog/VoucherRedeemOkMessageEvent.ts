import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { VoucherRedeemOkMessageParser } from '../../parser';

export class VoucherRedeemOkMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, VoucherRedeemOkMessageParser);
    }

    public getParser(): VoucherRedeemOkMessageParser
    {
        return this.parser as VoucherRedeemOkMessageParser;
    }
}
