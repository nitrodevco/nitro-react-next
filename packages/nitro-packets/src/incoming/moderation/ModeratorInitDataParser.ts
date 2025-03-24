import { IMessageDataWrapper } from '@nitrodevco/nitro-shared';
import { IModeratorInitData } from './IModeratorInitData';
import { IssueMessageDataParser } from './IssueMessageDataParser';

export const ModeratorInitDataParser = (wrapper: IMessageDataWrapper) =>
{
    const packet = {
        issues: [],
        messageTemplates: [],
        roomMessageTemplates: []
    } as IModeratorInitData;

    let count = wrapper.readInt();

    while (count > 0)
    {
        packet.issues.push(IssueMessageDataParser(wrapper));

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.messageTemplates.push(wrapper.readString());

        count--;
    }

    count = wrapper.readInt();

    while (count > 0)
    {
        //packet.roomMessageTemplates.push(wrapper.readString());
        wrapper.readString();

        count--;
    }

    packet.cfhPermission = wrapper.readBoolean();
    packet.chatlogsPermission = wrapper.readBoolean();
    packet.alertPermission = wrapper.readBoolean();
    packet.kickPermission = wrapper.readBoolean();
    packet.banPermission = wrapper.readBoolean();
    packet.roomAlertPermission = wrapper.readBoolean();
    packet.roomKickPermission = wrapper.readBoolean();

    count = wrapper.readInt();

    while (count > 0)
    {
        packet.roomMessageTemplates.push(wrapper.readString());

        count--;
    }

    return packet;
}
