import { IMessageDataWrapper, IMessageParser } from '#renderer/api';
import { ScrKickbackData } from './ScrKickbackData';

export class ScrSendKickbackInfoMessageParser implements IMessageParser
{
    private _data: ScrKickbackData;

    public flush(): boolean
    {
        this._data = null;
        return true;
    }
    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._data = new ScrKickbackData(wrapper);
        return true;
    }

    public get data(): ScrKickbackData
    {
        return this._data;
    }
}
