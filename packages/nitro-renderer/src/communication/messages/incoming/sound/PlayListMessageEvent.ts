import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PlayListMessageParser } from '../../parser';

export class PlayListMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PlayListMessageParser);
    }

    public getParser(): PlayListMessageParser
    {
        return this.parser as PlayListMessageParser;
    }
}
