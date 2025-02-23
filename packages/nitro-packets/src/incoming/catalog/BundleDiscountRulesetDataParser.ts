import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IBundleDiscountRulesetData } from './IBundleDiscountRulesetData';

export const BundleDiscountRulesetDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet: IBundleDiscountRulesetData = {
        maxPurchaseSize: wrapper.readInt(),
        bundleSize: wrapper.readInt(),
        bundleDiscountSize: wrapper.readInt(),
        bonusThreshold: wrapper.readInt(),
        additionalBonusDiscountThresholdQuantities: []
    };

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.additionalBonusDiscountThresholdQuantities.push(wrapper.readInt());

        count--;
    }

    return packet;
}
