import { IObjectData } from './IObjectData';
import { ObjectDataFlagsEnum } from './ObjectDataFlagsEnum';
import { CrackableDataType, EmptyDataType, HighScoreDataType, LegacyDataType, MapDataType, NumberDataType, StringDataType, VoteDataType } from './type';

export const GetObjectDataForFlags = (flags: ObjectDataFlagsEnum) =>
{
    let objectData: IObjectData = null;

    switch (flags & 0xFF)
    {
        case ObjectDataFlagsEnum.Crackable:
            objectData = new CrackableDataType();
            break;
        case ObjectDataFlagsEnum.Empty:
            objectData = new EmptyDataType();
            break;
        case ObjectDataFlagsEnum.Highscore:
            objectData = new HighScoreDataType();
            break;
        case ObjectDataFlagsEnum.Legacy:
            objectData = new LegacyDataType();
            break;
        case ObjectDataFlagsEnum.Map:
            objectData = new MapDataType();
            break;
        case ObjectDataFlagsEnum.Number:
            objectData = new NumberDataType();
            break;
        case ObjectDataFlagsEnum.String:
            objectData = new StringDataType();
            break;
        case ObjectDataFlagsEnum.Vote:
            objectData = new VoteDataType();
            break;
    }

    if (!objectData) return null;

    objectData.flags = (flags & 0xFF00);

    return objectData;
}
