import { IMessageDataWrapper, IMessageParser } from '#renderer/api';

export class OpenPetPackageResultMessageParser implements IMessageParser
{
    private _objectId: number;
    private _nameValidationStatus: number;
    private _nameValidationInfo: string;

    public flush(): boolean
    {
        this._objectId = 0;
        this._nameValidationStatus = 0;
        this._nameValidationInfo = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._objectId = wrapper.readInt();
        this._nameValidationStatus = wrapper.readInt();
        this._nameValidationInfo = wrapper.readString();

        return true;
    }

    public get objectId(): number
    {
        return this._objectId;
    }

    public get nameValidationStatus(): number
    {
        return this._nameValidationStatus;
    }

    public get nameValidationInfo(): string
    {
        return this._nameValidationInfo;
    }
}
