import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FigureSetIdsMessageParser } from '../../../parser';

export class FigureSetIdsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FigureSetIdsMessageParser);
    }

    public getParser(): FigureSetIdsMessageParser
    {
        return this.parser as FigureSetIdsMessageParser;
    }
}
