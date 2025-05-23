import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { WiredSaveSuccessParser } from '../../parser';

export class WiredSaveSuccessEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredSaveSuccessParser);
    }

    public getParser(): WiredSaveSuccessParser
    {
        return this.parser as WiredSaveSuccessParser;
    }
}
