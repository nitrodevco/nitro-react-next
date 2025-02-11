import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FurnitureAliasesParser } from '../../../parser';

export class FurnitureAliasesEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FurnitureAliasesParser);
    }

    public getParser(): FurnitureAliasesParser
    {
        return this.parser as FurnitureAliasesParser;
    }
}
