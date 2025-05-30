import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserGameAchievementsMessageParser } from '../../../parser';

export class UserGameAchievementsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserGameAchievementsMessageParser);
    }

    public getParser(): UserGameAchievementsMessageParser
    {
        return this.parser as UserGameAchievementsMessageParser;
    }
}
