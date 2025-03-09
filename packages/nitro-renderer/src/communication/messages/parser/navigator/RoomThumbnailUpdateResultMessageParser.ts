import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class RoomThumbnailUpdateResultMessageParser implements IMessageParser
{
    private _flatId: number;
    private _resultCode: number;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._flatId = wrapper.readInt();
        this._resultCode = wrapper.readInt();
        return true;
    }

    public get flatId(): number
    {
        return this._flatId;
    }

    public get resultCode(): number
    {
        return this._resultCode;
    }

}
