import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FlatControllersParser } from '../../parser';

export class FlatControllersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FlatControllersParser);
    }

    public getParser(): FlatControllersParser
    {
        return this.parser as FlatControllersParser;
    }
}
