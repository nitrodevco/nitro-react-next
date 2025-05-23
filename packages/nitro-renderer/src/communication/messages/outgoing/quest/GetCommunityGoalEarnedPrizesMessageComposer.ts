import { IMessageComposer } from '#renderer/api';

export class GetCommunityGoalEarnedPrizesMessageComposer implements IMessageComposer<ConstructorParameters<typeof GetCommunityGoalEarnedPrizesMessageComposer>>
{
    private _data: ConstructorParameters<typeof GetCommunityGoalEarnedPrizesMessageComposer>;

    constructor()
    {
        this._data = [];
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
