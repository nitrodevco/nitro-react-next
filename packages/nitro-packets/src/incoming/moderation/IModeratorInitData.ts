import { IIssueMessageData } from './IIssueMessageData';

export interface IModeratorInitData
{
    messageTemplates: string[];
    roomMessageTemplates: string[];
    issues: IIssueMessageData[];
    cfhPermission: boolean;
    chatlogsPermission: boolean;
    alertPermission: boolean;
    kickPermission: boolean;
    banPermission: boolean;
    roomAlertPermission: boolean;
    roomKickPermission: boolean;
}
