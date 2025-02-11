import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { YouArePlayingGameParser } from '../../../parser';

export class YouArePlayingGameEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, YouArePlayingGameParser);
    }

    public getParser(): YouArePlayingGameParser
    {
        return this.parser as YouArePlayingGameParser;
    }
}
