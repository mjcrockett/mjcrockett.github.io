import { useRoutes } from 'react-router-dom';
import AvatarPage from '../../avatar/page';
import BreakPage from '@/app/break/page';

export const AppRoutes = () => {

    /*
    Note: Next.js uses a file-based routing system where the structure of folders and files within the app
    directory directly determines the application's routes. So this file may not be necessary.
    */

    let routes = [
        { path: '/break/*', element: <BreakPage />},
        { path: '/*', element: <AvatarPage />},
    ];

    const element = useRoutes(routes);
    return <>{element}</>;
};