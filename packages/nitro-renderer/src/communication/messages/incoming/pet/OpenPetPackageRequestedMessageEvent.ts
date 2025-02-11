import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { OpenPetPackageRequestedMessageParser } from './../../parser';

export class OpenPetPackageRequestedMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, OpenPetPackageRequestedMessageParser);
    }

    public getParser(): OpenPetPackageRequestedMessageParser
    {
        return this.parser as OpenPetPackageRequestedMessageParser;
    }
}
