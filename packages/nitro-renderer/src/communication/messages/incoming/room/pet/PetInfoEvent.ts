import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { PetInfoParser } from '../../../parser';

export class PetInfoEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, PetInfoParser);
    }

    public getParser(): PetInfoParser
    {
        return this.parser as PetInfoParser;
    }
}
