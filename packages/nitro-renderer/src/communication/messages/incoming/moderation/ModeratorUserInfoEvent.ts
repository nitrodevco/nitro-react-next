import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ModeratorUserInfoMessageParser } from '../../parser';

export class ModeratorUserInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorUserInfoMessageParser);
    }

    public getParser(): ModeratorUserInfoMessageParser
    {
        return this.parser as ModeratorUserInfoMessageParser;
    }
}
