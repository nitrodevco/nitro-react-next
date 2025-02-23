import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { ICatalogFireworkChargeData } from './ICatalogFireworkChargeData';

export const CatalogFireworkChargeDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: ICatalogFireworkChargeData = {
        stuffId: wrapper.readInt(),
        charges: wrapper.readInt(),
        _SafeStr_6935: wrapper.readInt(),
        _SafeStr_6936: wrapper.readInt(),
        _SafeStr_6518: wrapper.readInt(),
        _SafeStr_7875: wrapper.readInt()
    }

    return packet;
}
