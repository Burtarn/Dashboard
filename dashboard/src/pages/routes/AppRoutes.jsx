import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../../components/ProtectedRoutes/ProtectedRoutes';
import React, { lazy, Suspense } from 'react';
import Spinner from '../../components/Spinner/Spinner'


const Login = lazy(() => import('../../pages/Login'));
const Home = lazy(() => import('../../pages/Home'));
const Settings = lazy(() => import('../../pages/Settings'));
const Statistics = lazy(() => import('../../pages/Statistics'));
const Users = lazy(() => import('../../pages/Users'));
const Layout = lazy(() => import('../../pages/Layout/Layout'));

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Suspense fallback={<div> < Spinner /> </div>}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
            element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout />
                </ProtectedRoute>
            }
            >
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/users" element={<Users />} />
            </Route>
        </Routes>
        </Suspense>
    );
};

export default AppRoutes;
