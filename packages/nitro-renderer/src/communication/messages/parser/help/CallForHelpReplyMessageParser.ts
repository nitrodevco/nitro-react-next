import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class CallForHelpReplyMessageParser implements IMessageParser
{
    private _message: string;

    public flush(): boolean
    {
        this._message = null;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._message = wrapper.readString();
        return true;
    }

    public get message(): string
    {
        return this._message;
    }
}
