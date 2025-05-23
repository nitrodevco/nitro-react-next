import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { AchievementResolutionsMessageParser } from '../../../parser';

export class AchievementResolutionsMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, AchievementResolutionsMessageParser);
    }

    public getParser(): AchievementResolutionsMessageParser
    {
        return this.parser as AchievementResolutionsMessageParser;
    }
}
