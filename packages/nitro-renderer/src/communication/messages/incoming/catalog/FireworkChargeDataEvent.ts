import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FireworkChargeDataParser } from '../../parser';

export class FireworkChargeDataEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FireworkChargeDataParser);
    }

    public getParser(): FireworkChargeDataParser
    {
        return this.parser as FireworkChargeDataParser;
    }
}
