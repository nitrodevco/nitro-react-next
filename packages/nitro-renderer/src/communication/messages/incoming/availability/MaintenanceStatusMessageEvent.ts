import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { MaintenanceStatusMessageParser } from '../../parser';

export class MaintenanceStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, MaintenanceStatusMessageParser);
    }

    public getParser(): MaintenanceStatusMessageParser
    {
        return this.parser as MaintenanceStatusMessageParser;
    }
}
