import { IMessageComposer } from '#renderer/api';

export class FurniturePostItPlaceComposer implements IMessageComposer<ConstructorParameters<typeof FurniturePostItPlaceComposer>>
{
    private _data: ConstructorParameters<typeof FurniturePostItPlaceComposer>;

    constructor(itemId: number, wallLocation: string)
    {
        this._data = [itemId, wallLocation];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}
