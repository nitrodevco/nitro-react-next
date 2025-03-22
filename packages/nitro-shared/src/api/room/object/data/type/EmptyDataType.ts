import { IMessageDataWrapper } from '#shared/api';
import { IRoomObjectModel } from '../../IRoomObjectModel';
import { RoomObjectVariableEnum } from '../../RoomObjectVariableEnum';
import { IObjectData } from '../IObjectData';
import { ObjectDataBase } from '../ObjectDataBase';
import { ObjectDataTypeEnum } from '../ObjectDataTypeEnum';

export class EmptyDataType extends ObjectDataBase implements IObjectData
{
    private _state: string = '';

    public parseWrapper(wrapper: IMessageDataWrapper): void
    {
        this._state = '';

        super.parseWrapper(wrapper);
    }

    public writeRoomObjectModel(model: IRoomObjectModel): void
    {
        super.writeRoomObjectModel(model);

        model.setValue(RoomObjectVariableEnum.FurnitureDataFormat, ObjectDataTypeEnum.Empty);
    }

    public getLegacyString(): string
    {
        return this._state;
    }

    public compare(data: IObjectData): boolean
    {
        return super.compare(data);
    }
}
