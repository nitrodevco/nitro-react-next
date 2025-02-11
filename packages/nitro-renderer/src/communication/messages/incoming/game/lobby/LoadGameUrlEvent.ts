import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { LoadGameUrlParser } from '../../../parser';

export class LoadGameUrlEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, LoadGameUrlParser);
    }

    public getParser(): LoadGameUrlParser
    {
        return this.parser as LoadGameUrlParser;
    }
}
