import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { OpenPetPackageResultMessageParser } from './../../parser';

export class OpenPetPackageResultMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OpenPetPackageResultMessageParser);
    }

    public getParser(): OpenPetPackageResultMessageParser
    {
        return this.parser as OpenPetPackageResultMessageParser;
    }
}
