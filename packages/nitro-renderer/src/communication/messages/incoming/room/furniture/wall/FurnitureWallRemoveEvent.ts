import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FurnitureWallRemoveParser } from '../../../../parser';

export class FurnitureWallRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureWallRemoveParser);
    }

    public getParser(): FurnitureWallRemoveParser
    {
        return this.parser as FurnitureWallRemoveParser;
    }
}
