export interface IForumExtendedData
{
    readPermissions: number;
    postMessagePermissions: number;
    postThreadPermissions: number;
    moderatePermissions: number;
    readPermissionError: string;
    postMessagePermissionError: string;
    postThreadPermissionError: string;
    moderatePermissionError: string;
    reportPermissionError: string;
    canChangeSettings: boolean;
    isStaff: boolean;
}
