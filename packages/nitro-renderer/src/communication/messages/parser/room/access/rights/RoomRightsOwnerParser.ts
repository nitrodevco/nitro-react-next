import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class RoomRightsOwnerParser implements IMessageParser
{
    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        return true;
    }
}
