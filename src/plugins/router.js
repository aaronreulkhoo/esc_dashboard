import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/agents',
            name: 'agents',
            component: () => import('../components/Agents')
        },
        {
            path: '/reviews/:id',
            name: 'reviews',
            component: () => import('../components/Reviews')
        },
        { path: '/reviews', redirect: '/agents' }
    ]
})
