const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [{ path: '', component: () => import('pages/AuthPage.vue') }],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HomePage.vue') }],
  },
  {
    path: '/academics',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StudentAcademicsPage.vue') }],
  },
  {
    path: '/grades',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StudentGradesPage.vue') }],
  },
  {
    path: '/ledger',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StudentLedgerPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
