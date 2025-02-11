import { IMessageComposer } from '#renderer/api';

export class RequestPetInfoComposer implements IMessageComposer<ConstructorParameters<typeof RequestPetInfoComposer>>
{
    private _data: ConstructorParameters<typeof RequestPetInfoComposer>;

    constructor(petId: number)
    {
        this._data = [petId];
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
