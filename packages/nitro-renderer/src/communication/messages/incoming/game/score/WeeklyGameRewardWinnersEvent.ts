import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { WeeklyGameRewardWinnersParser } from '../../../parser';

export class WeeklyGameRewardWinnersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WeeklyGameRewardWinnersParser);
    }

    public getParser(): WeeklyGameRewardWinnersParser
    {
        return this.parser as WeeklyGameRewardWinnersParser;
    }
}
