import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class ChatReviewSessionStartedMessageParser implements IMessageParser
{
    private _votingTimeout: number;
    private _chatRecord: string;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._votingTimeout = wrapper.readInt();
        this._chatRecord = wrapper.readString();
        return true;
    }

    public get votingTimeout(): number
    {
        return this._votingTimeout;
    }

    public get chatRecord(): string
    {
        return this._chatRecord;
    }
}
