import { Fragment, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Layout from './Layout'
import AuthGuard from './guards/AuthGuard'
import GuessGuard from './guards/GuessGuard'

const renderRoutes = (routes = []) => (
    <Suspense fallback={<LoadingScreen />}>
        <Switch>
            {
                routes.map((route,i)=> {
                    let Guard = route.guard || Fragment
                    let Layout = route.layout || Fragment
                    let Component = route.component

                    return <Route key={i} exact={route.exact} path={route.path} render={(props)=>(
                        <Guard>
                            <Layout>
                                <Component {...props} />
                            </Layout>
                        </Guard>
                    )} />
                })
            }
        </Switch>
    </Suspense>
)


export const routes = [
    {
        path: '/',
        exact: true,
        component: lazy(()=> import('../pages/Main')),
        layout: Layout
    },
    {
        path: '/clinics',
        exact: true,
        component: lazy(()=> import('../pages/Clinics')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/blogs',
        exact: true,
        component: lazy(()=> import('../pages/Blogs')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/contact',
        exact: true,
        component: lazy(()=> import('../pages/Contact')),
        layout: Layout
    },
    {
        path: '/about',
        exact: true,
        component: lazy(()=> import('../pages/About')),
        layout: Layout
    },
    {
        path: '/login',
        exact: true,
        component: lazy(()=> import('../pages/Login')),
        layout: Layout,
        guard: GuessGuard
    },
    {
        path: '/register',
        exact: true,
        component: lazy(()=> import('../pages/Register')),
        layout: Layout,
        guard: GuessGuard
    },
    {
        path: '/profile',
        exact: true,
        component: lazy(()=> import('../pages/Profile')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/clinic/:id',
        exact: true,
        component: lazy(()=> import('../pages/Clinic')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/pet/:id',
        exact: true,
        component: lazy(()=> import('../pages/Pet')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/blog/:id',
        exact: true,
        component: lazy(()=> import('../pages/Blog')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/vaccine/pet/:id',
        exact: true,
        component: lazy(()=> import('../pages/Vaccine')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/report/pet/:id',
        exact: true,
        component: lazy(()=> import('../pages/Reports')),
        layout: Layout,
        guard: AuthGuard
    },
    {
        path: '/create/pet',
        exact: true,
        component: lazy(()=> import('../pages/CreatePet')),
        layout: Layout
    }
]

export default renderRoutes