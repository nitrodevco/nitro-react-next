import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ChatReviewSessionResultsMessageParser } from '../../parser';

export class ChatReviewSessionResultsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ChatReviewSessionResultsMessageParser);
    }

    public getParser(): ChatReviewSessionResultsMessageParser
    {
        return this.parser as ChatReviewSessionResultsMessageParser;
    }
}
