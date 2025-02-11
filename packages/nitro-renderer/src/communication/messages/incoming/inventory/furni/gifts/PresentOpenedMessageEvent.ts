import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PresentOpenedMessageParser } from '../../../../parser';

export class PresentOpenedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PresentOpenedMessageParser);
    }

    public getParser(): PresentOpenedMessageParser
    {
        return this.parser as PresentOpenedMessageParser;
    }
}
