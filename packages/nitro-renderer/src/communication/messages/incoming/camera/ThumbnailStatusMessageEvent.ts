import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ThumbnailStatusMessageParser } from '../../parser';

export class ThumbnailStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ThumbnailStatusMessageParser);
    }

    public getParser(): ThumbnailStatusMessageParser
    {
        return this.parser as ThumbnailStatusMessageParser;
    }
}
