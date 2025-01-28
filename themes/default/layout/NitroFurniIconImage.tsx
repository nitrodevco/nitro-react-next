import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { NitroImage } from './NitroImage';

export const NitroFurniIconImage: FC<{
    url?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props => <NitroImage { ...props } />;
