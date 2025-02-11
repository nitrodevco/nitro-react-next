import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { GroupConfirmMemberRemoveParser } from '../../parser';

export class GroupConfirmMemberRemoveEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, GroupConfirmMemberRemoveParser);
    }

    public getParser(): GroupConfirmMemberRemoveParser
    {
        return this.parser as GroupConfirmMemberRemoveParser;
    }
}
