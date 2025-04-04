import dynamic from 'next/dynamic';
import { useRoutes } from 'react-router-dom';
import AvatarComponent from '../../avatar/avatar.component';

export const AppRoutes = () => {
    let routes = [
        { path: '/*', element: <AvatarComponent />}
    ];

    const element = useRoutes(routes);
    return <>{element}</>;
};