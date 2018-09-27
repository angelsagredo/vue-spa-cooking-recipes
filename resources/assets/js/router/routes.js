export default [
    {
        path: '/',
        name: 'home',
        component: require('../views/Home.vue'),
    },
    {
        path: '/privacy',
        component: require('../views/Privacy.vue'),
    },
    {
        path: '/about-us',
        component: require('../views/About.vue'),
    },
    {
        path: '/admin-panel',
        component: require('../views/AdminPanel.vue'),
    },
    {
        path: '/recipe/create',
        component: require('../views/CreateRecipe.vue'),
    },
    {
        path: '/recipe/:id',
        component: require('../views/Recipe.vue'),
    },
    {
        path: '/my-recipes',
        name: 'my-recipes',
        component: require('../views/MyRecipes.vue'),
    },
    {
        path: '/account',
        component: require('../views/Account.vue'),
    },
    {
        path: "/not-found",
        component: require('../views/404.vue'),
    },
    {
        path: "*",
        component: require('../views/404.vue'),
    }
]