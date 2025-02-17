import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IBundleDiscountRulesetData } from './IBundleDiscountRulesetData';

export const BundleDiscountRulesetDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        maxPurchaseSize: wrapper.readInt(),
        bundleSize: wrapper.readInt(),
        bundleDiscountSize: wrapper.readInt(),
        bonusThreshold: wrapper.readInt(),
        additionalBonusDiscountThresholdQuantities: []
    } as IBundleDiscountRulesetData;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.additionalBonusDiscountThresholdQuantities.push(wrapper.readInt());

        count--;
    }

    return packet;
}
