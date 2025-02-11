import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FurnitureListParser } from '../../../parser';

export class FurnitureListEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureListParser);
    }

    public getParser(): FurnitureListParser
    {
        return this.parser as FurnitureListParser;
    }
}
