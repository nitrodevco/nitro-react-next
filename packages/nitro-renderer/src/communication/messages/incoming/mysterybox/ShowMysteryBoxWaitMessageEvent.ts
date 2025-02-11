import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { ShowMysteryBoxWaitMessageParser } from '../../parser/mysterybox';

export class ShowMysteryBoxWaitMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, ShowMysteryBoxWaitMessageParser);
    }

    public getParser(): ShowMysteryBoxWaitMessageParser
    {
        return this.parser as ShowMysteryBoxWaitMessageParser;
    }
}
