import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CommunityVoteReceivedParser } from '../../../parser';

export class CommunityGoalVoteMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CommunityVoteReceivedParser);
    }

    public getParser(): CommunityVoteReceivedParser
    {
        return this.parser as CommunityVoteReceivedParser;
    }
}
