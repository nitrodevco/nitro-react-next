import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class ChatReviewSessionOfferedToGuideMessageParser implements IMessageParser
{
    private _acceptanceTimeout: number;

    public flush(): boolean
    {
        this._acceptanceTimeout = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._acceptanceTimeout = wrapper.readInt();
        return true;
    }

    public get acceptanceTimeout(): number
    {
        return this._acceptanceTimeout;
    }
}
