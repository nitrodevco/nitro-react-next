import { BufferImageSource, Filter, GlProgram, GpuProgram, Texture } from 'pixi.js';

const GetLookUpTable = (data: number[]) =>
{
    const lookUpTable: number[] = [];

    for(let i = 0; i < data.length; i++)
    {
        lookUpTable[(i * 4) + 0] = ((data[i] >> 16) & 0xFF);
        lookUpTable[(i * 4) + 1] = ((data[i] >> 8) & 0xFF);
        lookUpTable[(i * 4) + 2] = (data[i] & 0xFF);
        lookUpTable[(i * 4) + 3] = ((data[i] >> 24) & 0xFF);
    }

    return lookUpTable;
};

export interface PaletteMapFilterOptions
{
    palette: number[];
    channel: number;
}

export class PaletteMapFilter extends Filter
{
    public static readonly DEFAULT_OPTIONS: PaletteMapFilterOptions = {
        palette: [],
        channel: 0
    };

    public uniforms: {
        uChannel: number;
    };

    constructor(options: PaletteMapFilterOptions)
    {
        options = { ...PaletteMapFilter.DEFAULT_OPTIONS, ...options };

        const lookUpTable = GetLookUpTable(options.palette);
        const source = BufferImageSource.from({
            width: lookUpTable.length / 4,
            height: 1,
            resource: Uint8Array.from(lookUpTable),
            scaleMode: 'linear',
            autoGenerateMipmaps: false
        });

        const texture = Texture.from(source);
        const gpuProgram: GpuProgram = null;
        const glProgram: GlProgram = GlProgram.from({
            vertex: `
            in vec2 aPosition;
            out vec2 vTextureCoord;
            
            uniform vec4 uInputSize;
            uniform vec4 uOutputFrame;
            uniform vec4 uOutputTexture;
            
            vec4 filterVertexPosition( void )
            {
                vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
                
                position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
                position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
            
                return vec4(position, 0.0, 1.0);
            }
            
            vec2 filterTextureCoord( void )
            {
                return aPosition * (uOutputFrame.zw * uInputSize.zw);
            }
            
            void main(void)
            {
                gl_Position = filterVertexPosition();
                vTextureCoord = filterTextureCoord();
            }`,
            fragment: `
            in vec2 vTextureCoord;

            uniform sampler2D uTexture;
            uniform sampler2D uPaletteTexture;
            uniform float uChannel;

            void main() {
                vec4 currentColor = texture2D(uTexture, vTextureCoord);
                vec4 paletteColor = currentColor;

                if(currentColor.a > 0.0) {
                    paletteColor = texture2D(uPaletteTexture, vec2((currentColor.r * 255.0 + 0.5) / 256.0, 0.5));
                }

                gl_FragColor = vec4(paletteColor.r, paletteColor.g, paletteColor.b, currentColor.a);
            }`,
            name: 'palette-map-filter'
        });

        console.log(texture);

        super({
            gpuProgram,
            glProgram,
            resources: {
                paletteMapUniforms: {
                    uChannel: { value: options.channel, type: 'f32' }
                },
                uPaletteTexture: texture.source,
                uPaletteSampler: texture.source.style
            }
        });

        this.uniforms = this.resources.paletteMapUniforms.uniforms;
        this.resources.uPaletteTexture = texture.source;
        this.resources.uPaletteSampler = texture.source.style;

        Object.assign(this, options);
    }
}
