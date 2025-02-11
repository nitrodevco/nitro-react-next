import { ColorChannelType } from '#renderer/api';
import { ColorMatrixFilter } from 'pixi.js';

export const GetGrayscaleFilter = (channel: string = ColorChannelType.CHANNELS_EQUAL) =>
{
    let red = 0.33;
    let green = 0.33;
    let blue = 0.33;

    switch (channel)
    {
        case ColorChannelType.CHANNELS_UNIQUE:
            red = 0.3;
            green = 0.59;
            blue = 0.11;
            break;
        case ColorChannelType.CHANNELS_RED:
            red = 1;
            green = 0;
            blue = 0;
            break;
        case ColorChannelType.CHANNELS_GREEN:
            red = 0;
            green = 1;
            blue = 0;
            break;
        case ColorChannelType.CHANNELS_BLUE:
            red = 0;
            green = 0;
            blue = 1;
            break;
        case ColorChannelType.CHANNELS_DESATURATED:
            red = 0.3086;
            green = 0.6094;
            blue = 0.082;
            break;
    }

    const filter = new ColorMatrixFilter();

    filter.matrix = [
        red, green, blue, 0, 0, // Red channel
        red, green, blue, 0, 0, // Green channel
        red, green, blue, 0, 0, // Blue channel
        0, 0, 0, 1, 0 // Alpha channel
    ];

    return filter;
};
