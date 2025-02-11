import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { QuestsMessageParser } from '../../parser';

export class QuestsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, QuestsMessageParser);
    }

    public getParser(): QuestsMessageParser
    {
        return this.parser as QuestsMessageParser;
    }
}
