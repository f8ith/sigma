import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'
import Home from './pages/Home.vue'

export type AppRouteNames = 'global-feed'
| 'my-feed'
| 'tag'
| 'article'
| 'create-article'
| 'edit-article'
| 'login'
| 'register'
| 'profile'
| 'profile-favorites'
| 'settings'
  'events'
  'event'
  'submit-score'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'global-feed',
      path: '/',
      component: Home,
    },
    {
      name: 'my-feed',
      path: '/my-feeds',
      component: Home,
    },
    {
      name: 'tag',
      path: '/tag/:tag',
      component: Home,
    },
    {
      name: 'article',
      path: '/article/:slug',
      component: () => import('./pages/Article.vue'),
    },
    {
      name: 'edit-article',
      path: '/article/:slug/edit',
      component: () => import('./pages/EditArticle.vue'),
    },
    {
      name: 'create-article',
      path: '/article/create',
      component: () => import('./pages/EditArticle.vue'),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./pages/Login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('./pages/Register.vue'),
    },
    {
      name: 'profile',
      path: '/profile/:username',
      component: () => import('./pages/Profile.vue'),
    },
    {
      name: 'profile-favorites',
      path: '/profile/:username/favorites',
      component: () => import('./pages/Profile.vue'),
    },
    {
      name: 'settings',
      path: '/settings',
      component: () => import('./pages/Settings.vue'),
    },
    {
      name: 'events',
      path: '/events',
      component: () => import('./pages/EventsList.vue'),
    },
    {
      name: 'event',
      path: '/event/:id',
      component: () => import('./pages/EventDetail.vue'),
    },
    {
      name: 'edit-score',  
      path: '/event/:id/edit',
      component: () => import('./pages/EditScore.vue'),
    },
    {
      name: 'submit-score',  
      path: '/event/:id/submit',
      component: () => import('./pages/EditScore.vue'),
    },
    {
      name: 'sick-leave',
      path: '/sickleave',
      component: () => import('./pages/SickLeave.vue')
    },
    {
      name: 'event-completed',
      path: '/event/:id/completed',
      component: () => import('./pages/EventDetailCompleted.vue')
    }
  ],
})

export function routerPush (name: AppRouteNames, params?: RouteParams): ReturnType<typeof router.push> {
  if (params !== undefined) {
    return router.push({
      name,
      params,
    })
  } else {
    return router.push({ name })
  }
}
