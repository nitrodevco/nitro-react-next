import { IGroupItem } from './IGroupItem';

export class TradeUserData
{
    constructor(
        public userId: number = -1,
        public userName: string = '',
        public userItems: Map<string, IGroupItem> = new Map(),
        public itemCount: number = 0,
        public creditsCount: number = 0,
        public accepts: boolean = false,
        public canTrade: boolean = false)
    { }
}
