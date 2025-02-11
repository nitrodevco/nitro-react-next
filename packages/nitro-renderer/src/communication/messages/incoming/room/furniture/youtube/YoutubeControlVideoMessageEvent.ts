import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { YoutubeControlVideoMessageParser } from '../../../../parser';

export class YoutubeControlVideoMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeControlVideoMessageParser);
    }

    public getParser(): YoutubeControlVideoMessageParser
    {
        return this.parser as YoutubeControlVideoMessageParser;
    }
}
