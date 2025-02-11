import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PollOfferParser } from '../../parser';

export class PollOfferEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PollOfferParser);
    }

    public getParser(): PollOfferParser
    {
        return this.parser as PollOfferParser;
    }
}
