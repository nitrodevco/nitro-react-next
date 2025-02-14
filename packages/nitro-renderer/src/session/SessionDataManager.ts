import { IFurnitureData, IGroupInformationManager, IMessageComposer, ISessionDataManager } from '#renderer/api';
import { AvailabilityStatusMessageEvent, GetCommunication, GetUserTagsComposer, InClientLinkEvent, MysteryBoxKeysEvent, RoomReadyMessageEvent, RoomUnitChatComposer } from '#renderer/communication';
import { MysteryBoxKeysUpdateEvent, NitroSettingsEvent, SessionDataPreferencesEvent } from '#renderer/events';
import { CreateLinkEvent, HabboWebTools } from '#renderer/utils';
import { EventStore } from '@nitrodevco/nitro-shared';
import { Texture } from 'pixi.js';
import { GroupInformationManager } from './GroupInformationManager';
import { IgnoredUsersManager } from './IgnoredUsersManager';
import { BadgeImageManager } from './badge/BadgeImageManager';
import { FurnitureDataLoader } from './furniture/FurnitureDataLoader';

export class SessionDataManager implements ISessionDataManager
{
    private _ignoredUsersManager: IgnoredUsersManager = new IgnoredUsersManager();
    private _groupInformationManager: IGroupInformationManager = new GroupInformationManager();

    private _systemOpen: boolean = false;
    private _systemShutdown: boolean = false;
    private _isAuthenticHabbo: boolean = false;
    private _isRoomCameraFollowDisabled: boolean = false;
    private _uiFlags: number = 0;

    private _floorItems: Map<number, IFurnitureData> = new Map();
    private _wallItems: Map<number, IFurnitureData> = new Map();
    private _furnitureData: FurnitureDataLoader = new FurnitureDataLoader(this._floorItems, this._wallItems);
    private _tags: string[] = [];

    private _badgeImageManager: BadgeImageManager = new BadgeImageManager();

    public async init(): Promise<void>
    {
        await Promise.all([
            this._furnitureData.init(),
            this._badgeImageManager.init(),
            this._ignoredUsersManager.init(),
            this._groupInformationManager.init()
        ]);

        GetCommunication().registerMessageEvent(new AvailabilityStatusMessageEvent(this.onAvailabilityStatusMessageEvent.bind(this)));
        GetCommunication().registerMessageEvent(new RoomReadyMessageEvent(this.onRoomModelNameEvent.bind(this)));
        GetCommunication().registerMessageEvent(new InClientLinkEvent(this.onInClientLinkEvent.bind(this)));
        GetCommunication().registerMessageEvent(new MysteryBoxKeysEvent(this.onMysteryBoxKeysEvent.bind(this)));

        EventStore.getState().subscribe<NitroSettingsEvent>(NitroSettingsEvent.SETTINGS_UPDATED, event =>
        {
            this._isRoomCameraFollowDisabled = event.cameraFollow;
            this._uiFlags = event.flags;

            EventStore.getState().emit(new SessionDataPreferencesEvent(this._uiFlags));
        });
    }

    public getAllFurnitureData(): IFurnitureData[]
    {
        return [...Array.from(this._floorItems.values()), ...Array.from(this._wallItems.values())];
    }

    private onAvailabilityStatusMessageEvent(event: AvailabilityStatusMessageEvent): void
    {
        if (!event || !event.connection) return;

        const parser = event.getParser();

        if (!parser) return;

        this._systemOpen = parser.isOpen;
        this._systemShutdown = parser.onShutdown;
        this._isAuthenticHabbo = parser.isAuthenticUser;
    }

    private onRoomModelNameEvent(event: RoomReadyMessageEvent): void
    {
        if (!event) return;

        const parser = event.getParser();

        if (!parser) return;

        HabboWebTools.roomVisited(parser.roomId);
    }

    private onInClientLinkEvent(event: InClientLinkEvent): void
    {
        if (!event) return;

        const parser = event.getParser();

        if (!parser) return;

        CreateLinkEvent(parser.link);
    }

    private onMysteryBoxKeysEvent(event: MysteryBoxKeysEvent): void
    {
        if (!event) return;

        const parser = event.getParser();

        if (!parser) return;

        EventStore.getState().emit(new MysteryBoxKeysUpdateEvent(parser.boxColor, parser.keyColor));
    }

    public getFloorItemData(id: number): IFurnitureData
    {
        const existing = this._floorItems.get(id);

        if (!existing) return null;

        return existing;
    }

    public getFloorItemDataByName(name: string): IFurnitureData
    {
        if (!name || !this._floorItems || !this._floorItems.size) return null;

        for (const item of this._floorItems.values())
        {
            if (!item || (item.className !== name)) continue;

            return item;
        }

        return null;
    }

    public getWallItemData(id: number): IFurnitureData
    {
        const existing = this._wallItems.get(id);

        if (!existing) return null;

        return existing;
    }

    public getWallItemDataByName(name: string): IFurnitureData
    {
        if (!name || !this._wallItems || !this._wallItems.size) return null;

        for (const item of this._wallItems.values())
        {
            if (!item || (item.className !== name)) continue;

            return item;
        }

        return null;
    }

    public getBadgeUrl(name: string): string
    {
        return this._badgeImageManager.getBadgeUrl(name);
    }

    public getGroupBadgeUrl(name: string): string
    {
        return this._badgeImageManager.getBadgeUrl(name, BadgeImageManager.GROUP_BADGE);
    }

    public getBadgeImage(name: string): Texture
    {
        return this._badgeImageManager.getBadgeImage(name);
    }

    public getGroupBadgeImage(name: string): Texture
    {
        return this._badgeImageManager.getBadgeImage(name, BadgeImageManager.GROUP_BADGE);
    }

    public getUserTags(roomUnitId: number): string[]
    {
        if (roomUnitId < 0) return;

        this.send(new GetUserTagsComposer(roomUnitId));
    }

    public loadBadgeImage(name: string): string
    {
        return this._badgeImageManager.loadBadgeImage(name);
    }

    public loadGroupBadgeImage(name: string): string
    {
        return this._badgeImageManager.loadBadgeImage(name, BadgeImageManager.GROUP_BADGE);
    }

    public sendSpecialCommandMessage(text: string, styleId: number = 0): void
    {
        this.send(new RoomUnitChatComposer(text));
    }

    public ignoreUser(name: string): void
    {
        this._ignoredUsersManager.ignoreUser(name);
    }

    public unignoreUser(name: string): void
    {
        this._ignoredUsersManager.unignoreUser(name);
    }

    public isUserIgnored(name: string): boolean
    {
        return this._ignoredUsersManager.isIgnored(name);
    }

    public getGroupBadge(groupId: number): string
    {
        return this._groupInformationManager.getGroupBadge(groupId);
    }

    public send(composer: IMessageComposer<unknown[]>): void
    {
        GetCommunication().connection.send(composer);
    }

    public get ignoredUsersManager(): IgnoredUsersManager
    {
        return this._ignoredUsersManager;
    }

    public get groupInformationManager(): IGroupInformationManager
    {
        return this._groupInformationManager;
    }

    public get isSystemOpen(): boolean
    {
        return this._systemOpen;
    }

    public get isSystemShutdown(): boolean
    {
        return this._systemShutdown;
    }

    public get isAuthenticHabbo(): boolean
    {
        return this._isAuthenticHabbo;
    }

    public get isCameraFollowDisabled(): boolean
    {
        return this._isRoomCameraFollowDisabled;
    }

    public get uiFlags(): number
    {
        return this._uiFlags;
    }

    public get tags(): string[]
    {
        return this._tags;
    }
}
