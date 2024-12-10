/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useStore } from '../store';

interface Props {
	route: Record<any, any>;
	path?: string;
	roles: Array<string>;
}

const ProtectedRoute: React.FC<Props> = ({ route, roles }) => {
	const user = useStore((state) => state);	
	const isAuthenticated = useStore((state) => state.isAuthenticated);

	const userHasRequiredRole = roles?.length
		? roles.includes(user?.role)
			? true
			: false
		: true;

	if (isAuthenticated && userHasRequiredRole) {
		return React.createElement(route.element, { name: route?.name });
	}

	if (isAuthenticated && !userHasRequiredRole) {
		return <Navigate to='/access-denied' />;
	}

	return <Navigate to='/login' />;
};

export default ProtectedRoute;
