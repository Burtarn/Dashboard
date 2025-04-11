import { Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../hooks/useAuth';  // Importera useAuth här
import ProtectedRoute from '../../components/ProtectedRoutes/ProtectedRoutes';

const Login = lazy(() => import('../../pages/Login'));
const Home = lazy(() => import('../../pages/Home'));
const Settings = lazy(() => import('../../pages/Settings'));
const Statistics = lazy(() => import('../../pages/Statistics'));
const Users = lazy(() => import('../../pages/Users'));
const Layout = lazy(() => import('../../pages/Layout/Layout'));
const NotFound = lazy(() => import('../../pages/NotFound'));

const AppRoutes = () => {
    const { isAuthenticated } = useAuth(); 

    return (
        <Suspense fallback={<div><Spinner /></div>}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/home" element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/users" element={<Users />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
