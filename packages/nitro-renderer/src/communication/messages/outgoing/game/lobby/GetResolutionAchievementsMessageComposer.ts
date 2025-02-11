import { IMessageComposer } from '#renderer/api';

export class GetResolutionAchievementsMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetResolutionAchievementsMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetResolutionAchievementsMessageComposer>;

    constructor(objectId: number, achievementId: number)
    {
        this._data = [objectId, achievementId];
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
