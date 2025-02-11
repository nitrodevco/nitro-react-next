import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AchievementResolutionProgressMessageParser } from '../../../parser';

export class AchievementResolutionProgressMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementResolutionProgressMessageParser);
    }

    public getParser(): AchievementResolutionProgressMessageParser
    {
        return this.parser as AchievementResolutionProgressMessageParser;
    }
}
