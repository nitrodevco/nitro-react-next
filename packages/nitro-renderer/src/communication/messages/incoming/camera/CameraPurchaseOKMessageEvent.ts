import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CameraPurchaseOKMessageParser } from '../../parser';

export class CameraPurchaseOKMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CameraPurchaseOKMessageParser);
    }

    public getParser(): CameraPurchaseOKMessageParser
    {
        return this.parser as CameraPurchaseOKMessageParser;
    }
}
