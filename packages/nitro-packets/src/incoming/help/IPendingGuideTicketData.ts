export interface IPendingGuideTicketData
{
    type: number;
    secondsAgo: number;
    isGuide: boolean;
    otherPartyName: string;
    otherPartyFigure: string;
    description: string;
    roomName: string;
}
