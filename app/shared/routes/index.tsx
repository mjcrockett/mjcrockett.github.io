import { useRoutes } from 'react-router-dom';
import AvatarPage from '../../avatar/avatar.page';

export const AppRoutes = () => {
    let routes = [
        { path: '/*', element: <AvatarPage />}
    ];

    const element = useRoutes(routes);
    return <>{element}</>;
};