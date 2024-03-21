<template>
    <div class="container">
        <div class="inner" :class="{ 'no-result' : !movies.length }">
            <Loader v-if="loading" />
            <div class="message" v-if="message">{{ message }}</div>
            <div class="movies" v-else>
                <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
            </div>
        </div>
    </div>
</template>

<script>
import MovieItem from '~/components/MovieItem';
import Loader from "~/components/Loader";
import { mapState } from 'vuex';

export default {
    components: {
        MovieItem,
        Loader
    },
    computed: {

        ...mapState('movie', [
            'movies',
            'message',
            'loading'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

    .container {
        margin-top: 30px;

        .inner {
            padding: 10px 0;
            text-align: center;
            background-color: $gray-200;
            border-radius: 4px;

            &.no-result {
                padding: 70px 0;
            }
        }
        .message {
            font-size: 20px; color: $gray-400;
        }
        .movies {
            display: flex; flex-wrap: wrap; justify-content: center;
        }
    }
</style>