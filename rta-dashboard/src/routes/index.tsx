/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import GLOBAL_ROUTES from './routes';
import { IRoute } from '../models/route';
import PublicLayout from '../layouts/PublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import NotFound from '../components/NotFound';
import ProtectedRoute from './ProtectedRoute';
import AccessDenied from '../components/AccessDenied';

const renderRoutes = (routes: IRoute[]) => {
	const _routes: any[] = [];
	routes.map((route: IRoute, index: number) => {
		const renderRoute = route?.private ? (
			<ProtectedRoute key={index} route={route} roles={route?.roles} />
		) : (
			React.createElement(route.element, { name: route?.name })
		);

		return _routes.push({
			path: route?.path,
			element: renderRoute,
		});
	});

	return _routes;
};

const AppRoutes = (): any => {
	return useRoutes([
		{
			path: '/dashboard',
			element: <PrivateLayout />,

			children: [
				{
					index: true,
					element: <Navigate to='/dashboard/home' replace />,
				},
				 ...renderRoutes(GLOBAL_ROUTES.PRIVATE),

			],
		},
		{
			path: '/',
			element: <PublicLayout />,
			children: [
				...renderRoutes(GLOBAL_ROUTES.PUBLIC),
				{ path: '/', element: <Navigate to='/dashboard' /> },
			],
		},
		{ path: '/access-denied', element: <AccessDenied /> },
		{ path: '*', element: <NotFound /> },
	]);
};

export default AppRoutes;
