import { IGraphicAsset } from '#renderer/api';

export interface ParticleSystemParticle
{
    isEmitter?: boolean;
    lifeTime?: number;
    fade?: boolean;
    frames?: IGraphicAsset[];
}
