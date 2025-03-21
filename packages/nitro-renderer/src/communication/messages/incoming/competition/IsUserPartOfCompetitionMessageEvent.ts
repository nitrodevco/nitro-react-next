import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { IsUserPartOfCompetitionMessageParser } from '../../parser';

export class IsUserPartOfCompetitionMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IsUserPartOfCompetitionMessageParser);
    }

    public getParser(): IsUserPartOfCompetitionMessageParser
    {
        return this.parser as IsUserPartOfCompetitionMessageParser;
    }
}
