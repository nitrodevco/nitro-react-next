import { IMessageComposer } from '#renderer/api';

export class PetRemoveComposer implements IMessageComposer<ConstructorParameters<typeof PetRemoveComposer>>
{
    private _data: ConstructorParameters<typeof PetRemoveComposer>;

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
