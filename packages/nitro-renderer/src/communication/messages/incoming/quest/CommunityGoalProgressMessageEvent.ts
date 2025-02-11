import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CommunityGoalProgressMessageParser } from '../../parser';

export class CommunityGoalProgressMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityGoalProgressMessageParser);
    }

    public getParser(): CommunityGoalProgressMessageParser
    {
        return this.parser as CommunityGoalProgressMessageParser;
    }
}
