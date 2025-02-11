import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GotMysteryBoxPrizeMessageParser } from '../../parser/mysterybox';

export class GotMysteryBoxPrizeMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GotMysteryBoxPrizeMessageParser);
    }

    public getParser(): GotMysteryBoxPrizeMessageParser
    {
        return this.parser as GotMysteryBoxPrizeMessageParser;
    }
}
