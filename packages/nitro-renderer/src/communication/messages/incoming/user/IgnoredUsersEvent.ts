import { IMessageEvent } from '#renderer/api';
import { MessageEvent } from '#renderer/events';
import { IgnoredUsersParser } from '../../parser';

export class IgnoredUsersEvent extends MessageEvent implements IMessageEvent
{
    constructor(callBack: Function)
    {
        super(callBack, IgnoredUsersParser);
    }

    public getParser(): IgnoredUsersParser
    {
        return this.parser as IgnoredUsersParser;
    }
}
