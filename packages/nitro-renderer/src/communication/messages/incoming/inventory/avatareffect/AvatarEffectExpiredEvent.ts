import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AvatarEffectExpiredParser } from '../../../parser';

export class AvatarEffectExpiredEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AvatarEffectExpiredParser);
    }

    public getParser(): AvatarEffectExpiredParser
    {
        return this.parser as AvatarEffectExpiredParser;
    }
}
