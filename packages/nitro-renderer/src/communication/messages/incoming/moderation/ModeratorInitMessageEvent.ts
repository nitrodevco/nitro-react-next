import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ModeratorInitMessageParser } from '../../parser';

export class ModeratorInitMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ModeratorInitMessageParser);
    }

    public getParser(): ModeratorInitMessageParser
    {
        return this.parser as ModeratorInitMessageParser;
    }
}
