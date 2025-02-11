import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ChatReviewSessionVotingStatusMessageParser } from '../../parser';

export class ChatReviewSessionVotingStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionVotingStatusMessageParser);
    }

    public getParser(): ChatReviewSessionVotingStatusMessageParser
    {
        return this.parser as ChatReviewSessionVotingStatusMessageParser;
    }
}
