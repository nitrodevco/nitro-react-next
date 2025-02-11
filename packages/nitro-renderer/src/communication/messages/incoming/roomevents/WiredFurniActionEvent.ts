import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { WiredFurniActionParser } from '../../parser';

export class WiredFurniActionEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, WiredFurniActionParser);
    }

    public getParser(): WiredFurniActionParser
    {
        return this.parser as WiredFurniActionParser;
    }
}
