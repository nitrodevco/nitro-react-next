import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { UserSettingsParser } from '../../../parser';

export class UserSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, UserSettingsParser);
    }

    public getParser(): UserSettingsParser
    {
        return this.parser as UserSettingsParser;
    }
}
