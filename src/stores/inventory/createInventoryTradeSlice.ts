import { TradeState, TradeUserData } from '#base/api';
import { StateCreator } from 'zustand';
import { InventoryUnseenSlice } from './createInventoryUnseenSlice';

export interface InventoryTradeSlice
{
    primaryUser: TradeUserData;
    secondaryUser: TradeUserData;
    tradeState: number;
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
        tradeState: TradeState.TRADING_STATE_READY
    });
