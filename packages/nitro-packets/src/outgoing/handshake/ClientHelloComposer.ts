import { INitroOutgoingPacket } from '#packets/api';
import { ClientDeviceCategoryEnum, ClientPlatformEnum } from '@nitrodevco/nitro-shared';

type ClientHelloComposerType = {
    releaseVersion: string;
    type: string;
    platform: number;
    category: number
}

export const ClientHelloComposer: INitroOutgoingPacket<ClientHelloComposerType> = params =>
{
    // TODO FIX VERSION
    return [
        `NITRO-3`,
        'HTML5',
        ClientPlatformEnum.HTML5,
        ClientDeviceCategoryEnum.BROWSER
    ];
}
