import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { BuildersClubFurniCountMessageParser } from '../../parser';

export class BuildersClubFurniCountMessageEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, BuildersClubFurniCountMessageParser);
    }

    public getParser(): BuildersClubFurniCountMessageParser
    {
        return this.parser as BuildersClubFurniCountMessageParser;
    }
}
