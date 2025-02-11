import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PetScratchFailedMessageParser } from './../../parser';

export class PetScratchFailedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetScratchFailedMessageParser);
    }

    public getParser(): PetScratchFailedMessageParser
    {
        return this.parser as PetScratchFailedMessageParser;
    }
}
