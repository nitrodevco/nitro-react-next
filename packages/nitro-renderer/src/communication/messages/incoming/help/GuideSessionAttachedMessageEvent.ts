import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GuideSessionAttachedMessageParser } from '../../parser';

export class GuideSessionAttachedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GuideSessionAttachedMessageParser);
    }

    public getParser(): GuideSessionAttachedMessageParser
    {
        return this.parser as GuideSessionAttachedMessageParser;
    }
}
