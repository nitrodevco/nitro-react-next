import { useNavigator } from '#base/hooks';
import { FC } from 'react';

export const NavigatorView: FC = () =>
{
    console.log('render navi');

    useNavigator();

    return null;
};
