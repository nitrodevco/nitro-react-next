import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CompetitionStatusMessageParser } from '../../parser';

export class CompetitionStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CompetitionStatusMessageParser);
    }

    public getParser(): CompetitionStatusMessageParser
    {
        return this.parser as CompetitionStatusMessageParser;
    }
}
