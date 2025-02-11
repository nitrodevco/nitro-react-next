import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { WiredFurniConditionParser } from '../../parser';

export class WiredFurniConditionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniConditionParser);
    }

    public getParser(): WiredFurniConditionParser
    {
        return this.parser as WiredFurniConditionParser;
    }
}
