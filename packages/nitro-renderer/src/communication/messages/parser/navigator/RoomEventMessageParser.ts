import { IMessageDataWrapper, IMessageParser } from '#renderer/api';
import { RoomEventData } from './utils';

export class RoomEventMessageParser implements IMessageParser
{
    private _data: RoomEventData;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._data = new RoomEventData(wrapper);
        return true;
    }

    public get data(): RoomEventData
    {
        return this._data;
    }
}
