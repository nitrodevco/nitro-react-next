import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { RoomFowardParser as RoomForwardParser } from '../../../parser';

export class RoomForwardEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, RoomForwardParser);
    }

    public getParser(): RoomForwardParser
    {
        return this.parser as RoomForwardParser;
    }
}
