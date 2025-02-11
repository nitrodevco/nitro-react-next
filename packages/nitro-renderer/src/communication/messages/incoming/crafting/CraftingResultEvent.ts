import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { CraftingResultMessageParser } from '../../parser';

export class CraftingResultEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, CraftingResultMessageParser);
    }

    public getParser(): CraftingResultMessageParser
    {
        return this.parser as CraftingResultMessageParser;
    }
}
