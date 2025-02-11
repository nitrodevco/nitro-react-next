import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AchievementsScoreParser } from '../../../parser';

export class AchievementsScoreEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementsScoreParser);
    }

    public getParser(): AchievementsScoreParser
    {
        return this.parser as AchievementsScoreParser;
    }
}
