import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class OfficialSongIdMessageParser implements IMessageParser
{
    private _songId: number;
    private _officialSongId: string;

    public flush(): boolean
    {
        this._songId = 0;
        this._officialSongId = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._officialSongId = wrapper.readString();
        this._songId = wrapper.readInt();
        return true;
    }

    public get songId(): number
    {
        return this._songId;
    }

    public get officialSongId(): string
    {
        return this._officialSongId;
    }
}
