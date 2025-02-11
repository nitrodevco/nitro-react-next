import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { FloodControlParser } from '../../../../parser';

export class FloodControlEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, FloodControlParser);
    }

    public getParser(): FloodControlParser
    {
        return this.parser as FloodControlParser;
    }
}
