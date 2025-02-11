import { TradeStateEnum, TradeUserData } from '#base/api';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryTradeSlice
{
    primaryUser: TradeUserData;
    secondaryUser: TradeUserData;
    tradeState: TradeStateEnum;
}

export const createInventoryTradeSlice: StateCreator<
    InventoryTradeSlice & InventoryUnseenSlice,
    [],
    [],
    InventoryTradeSlice
> = set =>
    ({
        primaryUser: null,
        secondaryUser: null,
        tradeState: TradeStateEnum.Ready
    });
