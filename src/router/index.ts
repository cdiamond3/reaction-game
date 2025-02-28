import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReactionTimer from '@/components/ReactionTimer/ReactionTimer.vue'
import StatsPageComponent from '@/components/StatsPage/StatsPageComponent.vue'
import { isAuth } from '@/services/isAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/reaction-timer',
      name: 'ReactionTimer',
      component: ReactionTimer,
    },
    {
      path: '/my-stats',
      name: 'StatsPage',
      component: StatsPageComponent,
      meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
    },
  ],
})

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuth.get()) {
      // Redirect to home page if not authenticated
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router


