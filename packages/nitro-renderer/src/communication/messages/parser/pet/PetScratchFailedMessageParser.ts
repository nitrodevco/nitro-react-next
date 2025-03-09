import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class PetScratchFailedMessageParser implements IMessageParser
{
    private _currentAge: number;
    private _requiredAge: number;

    public flush(): boolean
    {
        this._currentAge = -1;
        this._requiredAge = -1;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._currentAge = wrapper.readInt();
        this._requiredAge = wrapper.readInt();

        return true;
    }

    public get currentAge(): number
    {
        return this._currentAge;
    }

    public get requiredAge(): number
    {
        return this._requiredAge;
    }
}
