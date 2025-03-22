import { IObjectData } from './IObjectData';
import { ObjectDataTypeEnum } from './ObjectDataTypeEnum';
import { CrackableDataType, EmptyDataType, HighScoreDataType, LegacyDataType, MapDataType, NumberDataType, StringDataType, VoteDataType } from './type';

export const GetObjectDataForFlags = (flags: number) =>
{
    let objectData: IObjectData = null;

    switch (flags & 0xFF)
    {
        case ObjectDataTypeEnum.Crackable:
            objectData = new CrackableDataType();
            break;
        case ObjectDataTypeEnum.Empty:
            objectData = new EmptyDataType();
            break;
        case ObjectDataTypeEnum.Highscore:
            objectData = new HighScoreDataType();
            break;
        case ObjectDataTypeEnum.Legacy:
            objectData = new LegacyDataType();
            break;
        case ObjectDataTypeEnum.Map:
            objectData = new MapDataType();
            break;
        case ObjectDataTypeEnum.Number:
            objectData = new NumberDataType();
            break;
        case ObjectDataTypeEnum.String:
            objectData = new StringDataType();
            break;
        case ObjectDataTypeEnum.Vote:
            objectData = new VoteDataType();
            break;
    }

    if (!objectData) return null;

    objectData.flags = (flags & 0xFF00);

    return objectData;
}
