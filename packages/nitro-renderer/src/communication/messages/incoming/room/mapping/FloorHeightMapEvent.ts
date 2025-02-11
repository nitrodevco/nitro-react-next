import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FloorHeightMapMessageParser } from '../../../parser';

export class FloorHeightMapEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FloorHeightMapMessageParser);
    }

    public getParser(): FloorHeightMapMessageParser
    {
        return this.parser as FloorHeightMapMessageParser;
    }
}
