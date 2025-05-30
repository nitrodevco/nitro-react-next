import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GroupSettingsParser } from '../../parser';

export class GroupSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupSettingsParser);
    }

    public getParser(): GroupSettingsParser
    {
        return this.parser as GroupSettingsParser;
    }
}
