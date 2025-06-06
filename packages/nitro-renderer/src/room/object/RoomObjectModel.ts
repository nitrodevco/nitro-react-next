import { IRoomObjectModel } from '#renderer/api';

export class RoomObjectModel implements IRoomObjectModel
{
    private _map: Map<string, unknown> = new Map();
    private _updateCounter: number = 0;

    public dispose(): void
    {
        this._map.clear();

        this._updateCounter = 0;
    }

    public getValue<T>(key: string): T
    {
        const existing = this._map.get(key);

        return (existing as T);
    }

    public setValue<T>(key: string, value: T): void
    {
        if (this._map.has(key))
        {
            if (this._map.get(key) === value) return;
        }

        this._map.set(key, value);

        this._updateCounter++;
    }

    public removeKey(key: string): void
    {
        if (!key) return;

        this._map.delete(key);

        this._updateCounter++;
    }

    public get updateCounter(): number
    {
        return this._updateCounter;
    }
}
