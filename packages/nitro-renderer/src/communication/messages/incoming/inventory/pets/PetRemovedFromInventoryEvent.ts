import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PetRemovedFromInventoryParser } from '../../../parser';

export class PetRemovedFromInventory extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetRemovedFromInventoryParser);
    }

    public getParser(): PetRemovedFromInventoryParser
    {
        return this.parser as PetRemovedFromInventoryParser;
    }
}
