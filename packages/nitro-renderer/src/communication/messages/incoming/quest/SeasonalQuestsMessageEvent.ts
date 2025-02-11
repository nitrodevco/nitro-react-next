import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { SeasonalQuestsParser } from '../../parser';

export class SeasonalQuestsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, SeasonalQuestsParser);
    }

    public getParser(): SeasonalQuestsParser
    {
        return this.parser as SeasonalQuestsParser;
    }
}
