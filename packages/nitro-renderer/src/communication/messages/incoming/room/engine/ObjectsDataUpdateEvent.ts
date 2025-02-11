import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ObjectsDataUpdateParser } from '../../../parser';

export class ObjectsDataUpdateEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ObjectsDataUpdateParser);
    }

    public getParser(): ObjectsDataUpdateParser
    {
        return this.parser as ObjectsDataUpdateParser;
    }
}
