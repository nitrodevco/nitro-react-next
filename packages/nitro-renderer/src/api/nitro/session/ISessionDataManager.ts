import { Texture } from 'pixi.js';
import { IFurnitureData } from './IFurnitureData';
import { IGroupInformationManager } from './IGroupInformationManager';
import { IIgnoredUsersManager } from './IIgnoredUsersManager';

export interface ISessionDataManager
{
    init(): Promise<void>;
    getAllFurnitureData(): IFurnitureData[];
    getFloorItemData(id: number): IFurnitureData;
    getFloorItemDataByName(name: string): IFurnitureData;
    getWallItemData(id: number): IFurnitureData;
    getWallItemDataByName(name: string): IFurnitureData;
    getBadgeUrl(name: string): string;
    getGroupBadgeUrl(name: string): string;
    getBadgeImage(name: string): Texture;
    getUserTags(roomUnitId: number): string[];
    loadBadgeImage(name: string): string;
    getGroupBadgeImage(name: string): Texture;
    loadGroupBadgeImage(name: string): string;
    sendSpecialCommandMessage(text: string, styleId?: number): void;
    ignoreUser(name: string): void;
    unignoreUser(name: string): void;
    isUserIgnored(name: string): boolean;
    getGroupBadge(groupId: number): string;
    ignoredUsersManager: IIgnoredUsersManager;
    groupInformationManager: IGroupInformationManager;
    isSystemOpen: boolean;
    isSystemShutdown: boolean;
    isAuthenticHabbo: boolean;
    isCameraFollowDisabled: boolean;
    uiFlags: number;
    tags: string[];
}
