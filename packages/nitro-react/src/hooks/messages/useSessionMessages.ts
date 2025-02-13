import { useConfigurationStore, useSessionStore } from '#base/stores';
import { AccountSafetyLockStatusChangeMessageEvent, AccountSafetyLockStatusChangeParser, ChangeUserNameResultMessageEvent, EmailStatusResultEvent, FigureUpdateEvent, NoobnessLevelEnum, NoobnessLevelMessageEvent, PetScratchFailedMessageEvent, UserInfoEvent, UserNameChangeMessageEvent, UserPermissionsEvent, UserTagsMessageEvent } from '@nitrodevco/nitro-renderer';
import { useShallow } from 'zustand/shallow';
import { useMessageEvent } from '../events';

export const useSessionMessages = () =>
{
    const [
        userId,
        processUserInfo,
        setName,
        updateFigure,
        setSafetyLock,
        updatePermissions,
        setNoobnessLevel,
        increasePetRespects,
        setEmailVerified,
        setTags
    ] = useSessionStore(
        useShallow(state => [
            state.userId,
            state.processUserInfo,
            state.setName,
            state.updateFigure,
            state.setSafetyLock,
            state.updatePermissions,
            state.setNoobnessLevel,
            state.increasePetRespects,
            state.setEmailVerified,
            state.setTags]));
    const setConfigValue = useConfigurationStore(state => state.setConfigValue);

    useMessageEvent<FigureUpdateEvent>(FigureUpdateEvent, event =>
    {
        const parser = event.getParser();

        updateFigure(parser.figure, parser.gender);
    });

    useMessageEvent<UserInfoEvent>(UserInfoEvent, event =>
    {
        const parser = event.getParser();
        const userInfo = parser.userInfo;

        if (!userInfo) return;

        processUserInfo({
            userId: userInfo.userId,
            name: userInfo.username,
            figure: userInfo.figure,
            gender: userInfo.gender,
            realName: userInfo.realName,
            respectsReceived: userInfo.respectsReceived,
            respectsRemaining: userInfo.respectsRemaining,
            respectsPetRemaining: userInfo.respectsPetRemaining,
            canChangeName: userInfo.canChangeName,
            safetyLocked: userInfo.safetyLocked
        });

        // TODO this._ignoredUsersManager.requestIgnoredUsers(userInfo.username);
    });

    useMessageEvent<UserPermissionsEvent>(UserPermissionsEvent, event =>
    {
        const parser = event.getParser();

        updatePermissions(parser.clubLevel, parser.securityLevel, parser.isAmbassador);
    });

    useMessageEvent<PetScratchFailedMessageEvent>(PetScratchFailedMessageEvent, event =>
    {
        increasePetRespects();
    });

    useMessageEvent<ChangeUserNameResultMessageEvent>(ChangeUserNameResultMessageEvent, event =>
    {
        const parser = event.getParser();

        if (parser.resultCode !== ChangeUserNameResultMessageEvent.NAME_OK) return;

        setName(undefined, false);
    });

    useMessageEvent<UserNameChangeMessageEvent>(UserNameChangeMessageEvent, event =>
    {
        const parser = event.getParser();

        if (parser.webId !== userId) return;

        setName(parser.newName, false);
    });

    useMessageEvent<NoobnessLevelMessageEvent>(NoobnessLevelMessageEvent, event =>
    {
        const parser = event.getParser();

        setNoobnessLevel(parser.noobnessLevel);

        if (parser.noobnessLevel !== NoobnessLevelEnum.OLD_IDENTITY) setConfigValue('new.identity', 1);
    });

    useMessageEvent<AccountSafetyLockStatusChangeMessageEvent>(AccountSafetyLockStatusChangeMessageEvent, event =>
    {
        const parser = event.getParser();

        setSafetyLock((parser.status === AccountSafetyLockStatusChangeParser.SAFETY_LOCK_STATUS_LOCKED));
    });

    useMessageEvent<EmailStatusResultEvent>(EmailStatusResultEvent, event =>
    {
        const parser = event.getParser();

        setEmailVerified(parser.isVerified || false)
    });

    useMessageEvent<UserTagsMessageEvent>(UserTagsMessageEvent, event =>
    {
        const parser = event.getParser();

        setTags(parser.tags);
    });
};
