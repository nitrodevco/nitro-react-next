import { IConnection, IRoomHandlerListener } from '#renderer/api';
import { GetCommunication, OpenPetPackageRequestedMessageEvent, OpenPetPackageResultMessageEvent } from '#renderer/communication';
import { RoomSessionPetPackageEvent } from '#renderer/events';
import { EventStore } from '@nitrodevco/nitro-shared';
import { BaseHandler } from './BaseHandler';

export class PetPackageHandler extends BaseHandler
{
    constructor(connection: IConnection, listener: IRoomHandlerListener)
    {
        super(connection, listener);

        GetCommunication().registerMessageEvent(new OpenPetPackageRequestedMessageEvent(this.onOpenPetPackageRequested.bind(this)));
        GetCommunication().registerMessageEvent(new OpenPetPackageResultMessageEvent(this.onOpenPetPackageResult.bind(this)));
    }

    private onOpenPetPackageRequested(event: OpenPetPackageRequestedMessageEvent): void
    {
        if (!this.listener) return;

        const parser = event.getParser();

        if (!parser) return;

        const session = this.listener.getSession(this.roomId);

        if (!session) return;

        EventStore.getState().emit(new RoomSessionPetPackageEvent(RoomSessionPetPackageEvent.RSOPPE_OPEN_PET_PACKAGE_REQUESTED, session, parser.objectId, parser.figureData, 0, null));
    }

    private onOpenPetPackageResult(event: OpenPetPackageResultMessageEvent): void
    {
        if (!this.listener) return;

        const parser = event.getParser();

        if (!parser) return;

        const session = this.listener.getSession(this.roomId);

        if (!session) return;

        EventStore.getState().emit(new RoomSessionPetPackageEvent(RoomSessionPetPackageEvent.RSOPPE_OPEN_PET_PACKAGE_RESULT, session, parser.objectId, null, parser.nameValidationStatus, parser.nameValidationInfo));
    }
}
