import { FC } from 'react';
import './LoadingView.css';

export const LoadingView: FC = () =>
{
    const generateStars = (count: number, className: string) =>
    {
        return Array.from({ length: count }, () => ({
            top: `${ Math.random() * 100 }%`,
            left: `${ Math.random() * 100 }%`
        })).map((style, index) => (
            <div key={ index } className={ className } style={ style }>
                <div className="star-part" />
                <div className="star-part" />
            </div>
        ));
    };

    const smallStars = generateStars(90, 'dot');
    const mediumStars = generateStars(15, 'star');

    return (
        <div className="relative z-loading h-screen w-screen bg-loading">
            <div className="container flex h-screen w-screen">
                <div className="flex h-screen w-screen items-center justify-center">
                    { smallStars }
                    { mediumStars }
                </div>
            </div>
        </div>
    );
};
