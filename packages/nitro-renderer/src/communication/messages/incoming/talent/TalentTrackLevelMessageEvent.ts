import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { TalentTrackLevelMessageParser } from '../../parser';

export class TalentTrackLevelMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, TalentTrackLevelMessageParser);
    }

    public getParser(): TalentTrackLevelMessageParser
    {
        return this.parser as TalentTrackLevelMessageParser;
    }
}
