import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CommunityGoalEarnedPrizesMessageParser } from '../../parser';

export class CommunityGoalEarnedPrizesMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalEarnedPrizesMessageParser);
    }

    public getParser(): CommunityGoalEarnedPrizesMessageParser
    {
        return this.parser as CommunityGoalEarnedPrizesMessageParser;
    }
}
