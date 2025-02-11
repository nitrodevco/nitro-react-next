import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MessengerInitParser } from '../../parser';

export class MessengerInitEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MessengerInitParser);
    }

    public getParser(): MessengerInitParser
    {
        return this.parser as MessengerInitParser;
    }
}
