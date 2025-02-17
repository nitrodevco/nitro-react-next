import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { BundleDiscountRulesetDataParser } from './BundleDiscountRulesetDataParser';
import { IBundleDiscountRulesetData } from './IBundleDiscountRulesetData';

type BundleDiscountRulesetMessageType = {
    bundleDiscountRuleset: IBundleDiscountRulesetData;
};

export const BundleDiscountRulesetMessage: IIncomingPacket<BundleDiscountRulesetMessageType> = (wrapper: IMessageDataWrapper) =>
{
    const packet: BundleDiscountRulesetMessageType = {
        bundleDiscountRuleset: BundleDiscountRulesetDataParser(wrapper)
    };

    return packet;
};
