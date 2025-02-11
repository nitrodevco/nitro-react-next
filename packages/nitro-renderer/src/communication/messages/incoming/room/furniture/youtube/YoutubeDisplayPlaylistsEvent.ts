import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { YoutubeDisplayPlaylistsMessageParser } from '../../../../parser';

export class YoutubeDisplayPlaylistsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YoutubeDisplayPlaylistsMessageParser);
    }

    public getParser(): YoutubeDisplayPlaylistsMessageParser
    {
        return this.parser as YoutubeDisplayPlaylistsMessageParser;
    }
}
