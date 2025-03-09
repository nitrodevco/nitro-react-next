import { IMessageDataWrapper, IMessageParser } from '#renderer/api';
import { PlayListEntry } from './PlayListEntry';

export class PlayListMessageParser implements IMessageParser
{
    private _synchronizationCount: number;
    private _playlist: PlayListEntry[];

    public flush(): boolean
    {
        this._synchronizationCount = -1;
        this._playlist = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._synchronizationCount = wrapper.readInt();
        const count = wrapper.readInt();

        for (let i = 0; i < count; i++)
        {
            this._playlist.push(new PlayListEntry(
                wrapper.readInt(), wrapper.readInt(), wrapper.readString(), wrapper.readString()
            ));
        }
        return true;
    }

    public get synchronizationCount(): number
    {
        return this._synchronizationCount;
    }

    public get playList(): PlayListEntry[]
    {
        return this._playlist;
    }

}
