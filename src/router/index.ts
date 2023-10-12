import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
      name: 'Home',
			component: () => import('@/pages/Home.vue')
		},
    {
      path: '/photo/:id',
      name: 'PhotoDetail',
      component: () => import('@/pages/PhotoDetail.vue')
    },
		{
			path: '/favorites',
			name: 'Favorites',
			component: () => import('@/pages/Favorites.vue')
		}
	]
});

export default router;