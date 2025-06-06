import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class UnreadForumsCountMessageParser implements IMessageParser
{
    private _count: number;

    public flush(): boolean
    {
        this._count = 0;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if (!wrapper) return false;

        this._count = wrapper.readInt();

        return true;
    }

    public get count(): number
    {
        return this._count;
    }
}
