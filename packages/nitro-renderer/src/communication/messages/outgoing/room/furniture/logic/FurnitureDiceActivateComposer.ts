import { IMessageComposer } from '#renderer/api';

export class FurnitureDiceActivateComposer implements IMessageComposer<ConstructorParameters<typeof FurnitureDiceActivateComposer>>
{
    private _data: ConstructorParameters<typeof FurnitureDiceActivateComposer>;

    constructor(itemId: number)
    {
        this._data = [itemId];
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
