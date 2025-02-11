import { IRoomObjectModel } from '#renderer/api';
import { FurnitureRoomBrandingLogic } from './FurnitureRoomBrandingLogic';

export class FurnitureRoomBackgroundLogic extends FurnitureRoomBrandingLogic
{
    protected getAdClickUrl(model: IRoomObjectModel): string
    {
        return null;
    }
}
