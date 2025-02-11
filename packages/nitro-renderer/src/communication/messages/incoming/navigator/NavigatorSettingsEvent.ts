import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { NavigatorSettingsParser } from '../../parser';

export class NavigatorSettingsEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, NavigatorSettingsParser);
    }

    public getParser(): NavigatorSettingsParser
    {
        return this.parser as NavigatorSettingsParser;
    }
}
