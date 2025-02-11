import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GameStatusMessageParser } from '../../../parser';

export class GameStatusMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GameStatusMessageParser);
    }

    public getParser(): GameStatusMessageParser
    {
        return this.parser as GameStatusMessageParser;
    }
}
