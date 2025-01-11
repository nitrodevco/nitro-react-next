import { MergeFragments } from '#base/api';
import { useMessageEvent } from '#base/hooks';
import { useInventoryStore } from '#base/stores';
import { BadgeReceivedEvent, BadgesEvent, BotAddedToInventoryEvent, BotInventoryMessageEvent, BotRemovedFromInventoryEvent, FurnitureListAddOrUpdateEvent, FurnitureListEvent, FurnitureListInvalidateEvent, FurnitureListItemParser, FurnitureListRemovedEvent, FurniturePostItPlacedEvent, PetAddedToInventoryEvent, PetData, PetInventoryEvent, PetRemovedFromInventory } from '@nitrots/nitro-renderer';
import { useShallow } from 'zustand/shallow';

let furniMsgFragments: Map<number, FurnitureListItemParser>[] = null;
let petMsgFragments: Map<number, PetData>[] = null;

export const useInventoryMessages = () =>
{
    const [
        addOrUpdateFurniItems,
        processFurniItems,
        removeFurniItem,
        setFurniNeedsUpdate,
        addPetItem,
        processPetItems,
        removePetItem,
        processBadges,
        addBadge,
        processBotItems,
        addBotItem,
        removeBotItem
    ] = useInventoryStore(
        useShallow(state => [
            state.addOrUpdateFurniItems,
            state.processFurniItems,
            state.removeFurniItem,
            state.setFurniNeedsUpdate,
            state.addPetItem,
            state.processPetItems,
            state.removePetItem,
            state.processBadges,
            state.addBadge,
            state.processBotItems,
            state.addBotItem,
            state.removeBotItem
        ]));

    useMessageEvent<FurnitureListAddOrUpdateEvent>(FurnitureListAddOrUpdateEvent, event =>
    {
        addOrUpdateFurniItems(event?.getParser()?.items ?? null);
    });

    useMessageEvent<FurnitureListEvent>(FurnitureListEvent, event =>
    {
        const parser = event.getParser();

        if (!furniMsgFragments) furniMsgFragments = new Array(parser.totalFragments);

        const fragment = MergeFragments(parser.fragment, parser.totalFragments, parser.fragmentNumber, furniMsgFragments);

        if (!fragment) return;

        processFurniItems(fragment);

        furniMsgFragments = null;
    });

    useMessageEvent<FurnitureListInvalidateEvent>(FurnitureListInvalidateEvent, event =>
    {
        setFurniNeedsUpdate(true);
    });

    useMessageEvent<FurnitureListRemovedEvent>(FurnitureListRemovedEvent, event =>
    {
        removeFurniItem(event?.getParser()?.itemId);
    });

    useMessageEvent<FurniturePostItPlacedEvent>(FurniturePostItPlacedEvent, event =>
    {

    });

    useMessageEvent<PetInventoryEvent>(PetInventoryEvent, event =>
    {
        const parser = event.getParser();

        if (!petMsgFragments) petMsgFragments = new Array(parser.totalFragments);

        const fragment = MergeFragments(parser.fragment, parser.totalFragments, parser.fragmentNumber, petMsgFragments);

        if (!fragment) return;

        processPetItems(fragment);

        petMsgFragments = null;
    });

    useMessageEvent<PetAddedToInventoryEvent>(PetAddedToInventoryEvent, event =>
    {
        addPetItem(event?.getParser()?.pet);
    });

    useMessageEvent<PetRemovedFromInventory>(PetRemovedFromInventory, event =>
    {
        removePetItem(event?.getParser()?.petId);
    });

    useMessageEvent<BadgesEvent>(BadgesEvent, event =>
    {
        processBadges(event.getParser());
    });

    useMessageEvent<BadgeReceivedEvent>(BadgeReceivedEvent, event =>
    {
        const parser = event.getParser();

        addBadge(parser.badgeId, parser.badgeCode);
    });

    useMessageEvent<BotInventoryMessageEvent>(BotInventoryMessageEvent, event =>
    {
        processBotItems(event?.getParser().items);
    });

    useMessageEvent<BotAddedToInventoryEvent>(BotAddedToInventoryEvent, event =>
    {
        addBotItem(event?.getParser()?.item);
    });

    useMessageEvent<BotRemovedFromInventoryEvent>(BotRemovedFromInventoryEvent, event =>
    {
        removeBotItem(event?.getParser()?.itemId);
    });
};
