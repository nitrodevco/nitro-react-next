﻿import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class NoOwnedRoomsAlertMessageParser implements IMessageParser
{
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }
}
