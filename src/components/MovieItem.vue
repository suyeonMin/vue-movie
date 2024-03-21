<template>
    <RouterLink class="movie" :to="`/movie/${movie.imdbID}`" :style="{backgroundImage : `url(${movie.Poster})`}">
        <Loader v-if="imageLoading" :size="1.5" absolute />
        <div class="info">
            <div class="year">
                {{ movie.Year }}
            </div>
            <div class="title">
                {{ movie.Title }}
            </div>
        </div>
    </RouterLink>
</template>

<script>
import { RouterLink } from "vue-router"
import Loader from "~/components/Loader"

export default {
    components : {
        Loader
    },
    props: {
        movie: {
            type: Object,
            default : () => {
                // 객체 바로 쓰지말고 함수를 만들어 반환해야한다.
            }
        }
    },
    data() {
        return {
            imageLoading: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            await this.$loadImage(this.movie.Poster)
            this.imageLoading = false
        }
    }
   
}
</script>

<style lang="scss" scoped>
@import "~/scss/main";

    .movie {
        position: relative;
        margin: 10px;
        width: 200px; height: 300px;
        border-radius: 4px; border-color: $gray-400;
        background-size: cover;
        overflow: hidden;
        cursor: pointer;

        &:hover:after {
            content: '';
            position: absolute; top: 0; bottom: 0; left: 0; right: 0;
            border: 6px solid $primary;
        }

        .info {
            position: absolute; left: 0; bottom: 0;
            padding: 14px;
            width: 100%;
            font-size: 14px; text-align: center;
            background-color: rgba($black,.3);
            backdrop-filter: blur(10px);

            .year {
                color: $primary;
            }

            .title {
                color: $white;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
        }
    }
</style>