﻿import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class _Str_9021 implements IMessageParser
{
    private _itemId: number;

    public flush(): boolean
    {
        this._itemId = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        this._itemId = wrapper.readInt();

        return true;
    }

    public get itemId(): number
    {
        return this._itemId;
    }
}
