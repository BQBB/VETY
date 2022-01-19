import { Fragment, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Layout from './Layout'

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
        layout: Layout
    },
    {
        path: '/blogs',
        exact: true,
        component: lazy(()=> import('../pages/Blogs')),
        layout: Layout
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
]

export default renderRoutes