import { lazy } from 'react';
import { IRoute } from '../models/route';
import Loadable from '../components/Loadable';


const Login = Loadable(
	lazy(() => import('../pages/Auth/Login'))
);

const Dashboard = Loadable(
	lazy(() => import('../pages/Dashboard'))
);


const Metrics = Loadable(
	lazy(() => import('../pages/Metrics'))
);

const MetricsDetails = Loadable(
	lazy(() => import('../pages/Metrics/MetricsDetails'))
);

const UsersManagement = Loadable(
	lazy(() => import('../pages/UsersManagement'))
);

const AUTH_ROUTES: IRoute[] = [
	{
		path: 'login',
		element: Login,
		roles: [],
		private: false,
	}
]

const APP_ROUTES: IRoute[] = [
	{
		path: 'home',
		element: Dashboard,
		roles: [],
		private: true,
	},
	{
		path: 'metrics',
		element: Metrics,
		roles: [],
		private: true,
	},
	{
		path: 'metrics/view/:id',
		element: MetricsDetails,
		roles: [],
		private: true,
	},
	{
		path: 'users-management',
		element: UsersManagement,
		roles: ['ADMIN'],
		private: true,
	},
]

const GLOBAL_ROUTES: { PUBLIC: IRoute[]; PRIVATE: IRoute[] } = {
	PUBLIC: [...AUTH_ROUTES],
	PRIVATE: [...APP_ROUTES],
};

export default GLOBAL_ROUTES;
