<template>
    <header>
        <Logo />
        <div class="nav nav-pills">
            <div v-for="nav in navigations" :key="nav.name" class="nav-item">
                <RouterLink :to="nav.href" class="nav-link" active-class="active" :class="{active : isMatch(nav.path)}">
                    {{ nav.name }}
                </RouterLink> 
            </div>
        </div>
        <div class="user" @click="toAbout">
            <img :src="image" :alt="name" />
        </div>
    </header>
</template>

<script>
import Logo from "~/components/Logo";
import { mapState } from 'vuex';

export default{
    components: {
        Logo
    },
    data(){
        return {
            navigations: [
                {
                    name: 'Search',
                    href: '/'
                },
                {
                    name: 'Movie',
                    href: '/movie',
                    path: /^\/movie/
                },
                {
                    name: 'About',
                    href: '/about'
                }
            ]
        }
    },
    methods: {
        isMatch(path){
            if(!path){
                return false
            }
            return path.test(this.$route.fullPath);
        },
        toAbout(){
            this.$router.push('/about')
        }
    },
    computed: {

        ...mapState('about', [
            'image',
            'name'
        ])

    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

    header {
        display: flex; align-items: center;
        position: relative;
        padding: 0 40px;
        height: 70px;

        .logo {
            margin-right: 40px;
        }

        .user {
            position: absolute; top: 0; bottom: 0; right: 40px;
            padding: 6px; margin: auto;
            width: 40px; height: 40px;
            border-radius: 50%;
            background-color: $gray-200;
            box-sizing: border-box;
            cursor: pointer;

            &:hover {
                background-color: darken($gray-200, 10%);
            }

            img {width: 100%;}
        }

        @include media-breakpoint-down(sm){
            .nav {
                display: none;
            }
        }
    }
</style>