import { IMessageDataWrapper } from '#shared/api';
import { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataFlagsEnum } from '../ObjectDataFlagsEnum';

export class VoteDataType extends ObjectDataBase
{
    private _state: string = '';
    private _result: number = 0;

    public parseWrapper(wrapper: IMessageDataWrapper): void
    {
        if (!wrapper) return;

        this._state = wrapper.readString();
        this._result = wrapper.readInt();

        super.parseWrapper(wrapper);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataFlagsEnum.Vote);

        const data: { [index: string]: string } = {};

        data['S'] = this._state;
        data['R'] = this._result.toString();

        model.setValue(RoomObjectVariableEnum.FurnitureData, data);
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public compare(data: IObjectData): boolean
    {
        return true;
    }

    public setString(state: string): void
    {
        this._state = state;
    }

    public get result(): number
    {
        return this._result;
    }
}
