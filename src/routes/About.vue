<template>
    <div class="about">
        <div class="photo">
            <img :src="image" :alt="name">
        </div>
        <div class="name">{{ name }}</div>
        <div>{{ email }}</div>
        <div>{{ blog }}</div>
        <div>{{ phone }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        //mapState(모듈명, 사용할 상태)
        ...mapState('about', [
            'image',
            'name',
            'email',
            'blog',
            'phone'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

    .about {
        text-align: center;
    }
    .photo {
        position: relative;
        padding: 30px; margin: 40px auto 20px;
        width: 250px; height: 250px;
        border-radius: 50%;
        border: 10px solid $gray-300;
        background-color: $gray-200;

        img {
            width: 100%;
        }
    }
    .name {
        margin-bottom: 20px;
        font-size: 40px; font-family: "Oswald", sans-serif;
    }
</style>