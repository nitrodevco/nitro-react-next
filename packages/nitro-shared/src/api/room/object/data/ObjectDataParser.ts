import { IMessageDataWrapper } from '#shared/api';
import { GetObjectDataForFlags } from './GetObjectDataForFlags';

export const ObjectDataParser = (wrapper: IMessageDataWrapper) =>
{
    const flags = wrapper.readInt();
    const objectData = GetObjectDataForFlags(flags);

    if (objectData) objectData.parseWrapper(wrapper);

    return objectData;
}
