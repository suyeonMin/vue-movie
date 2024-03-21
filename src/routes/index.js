import {createRouter, createWebHashHistory} from 'vue-router';
import Home from './Home.vue';
import About from './About.vue';
import Movie from './Movie.vue';
import NotFound from './NotFound.vue';

export default createRouter({
    //Hash 모드 or History 모드 
    history: createWebHashHistory(),
    
    scrollBehavior(){
        return { top: 0 }
    },
    //pages
    routes: [
        {
            path: '/',  //페이지 구분하는 기준
            component: Home   //path로 접근했을때 이동할 컴포넌트(page)
        },
        {
            path: '/movie/:id',
            component: Movie
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/:notFound(.*)', //이름은 맘대로 할 수 있음. ()안의 정규표현식이 중요!
            component: NotFound
        }
    ]
})