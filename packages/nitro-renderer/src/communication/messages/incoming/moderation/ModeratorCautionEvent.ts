import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ModerationCautionParser } from '../../parser';

export class ModeratorCautionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModerationCautionParser);
    }

    public getParser(): ModerationCautionParser
    {
        return this.parser as ModerationCautionParser;
    }
}
