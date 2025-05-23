import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FurniturePostItPlacedParser } from '../../../parser';

export class FurniturePostItPlacedEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurniturePostItPlacedParser);
    }

    public getParser(): FurniturePostItPlacedParser
    {
        return this.parser as FurniturePostItPlacedParser;
    }
}
