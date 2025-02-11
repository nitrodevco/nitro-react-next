import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class RoomEventCancelMessageParser implements IMessageParser
{
    flush(): boolean
    {
        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        return true;
    }

}
