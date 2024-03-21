import axios from 'axios';
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!';

export default {
    namespaced: true, 
    state: () => {
        return {
            movies: [],
            message: _defaultMessage,
            loading: false,
            theMovie: {}
        }
    },  
    getters: {},  
    mutations: {
        updateState(state, payload){
            // ['movies', 'message', 'loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
                //state.movies = payload.movies
                //state.message = payload.message
                //satae.loading = payload.loading
            })
        },
        resetMovies(state){
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    }, 
    actions: {
        async searchMovies({state, commit}, payload){
            if(state.loading) {
                return
            }

            commit('updateState', {
                message: '',
                loading: true
            })

            try {
                const res =  await _fetchMovie({
                    ...payload,
                    page : 1
                })
                //console.log(res);
                const {Search, totalResults} = res.data;
                commit('updateState', {
                    movies: _uniqBy(Search, 'imdbID')
                })
    
                const total = parseInt(totalResults);
                const pageLength = Math.ceil(total / 10);
    
                // 추가 페이지 요청!
                if(pageLength > 1){
                    for(let page = 2; page <= pageLength; page++){
                        if(page > (payload.number / 10)){
                            break;
                        }
                        const res =  await _fetchMovie({
                            ...payload,
                            page : page
                        });
    
                        const {Search} = res.data;
                        commit('updateState', {
                            movies: [...state.movies, ..._uniqBy(Search,'imdbID')]
                        })
                    }
                }
            } catch(message) {
                commit('updateState', {
                    movies: [],
                    message: message
                })
            } finally {
                commit('updateState', {
                    loading: false
                })
            }
        },

        async searchMovieWithId({ state, commit }, payload){
            if(state.loading) return;

            commit('updateState', {
                theMovie: {},
                loading: true
            })

            try {
                const res = await _fetchMovie(payload);
                commit('updateState', {
                    theMovie : res.data
                })
            } catch(err) {
                commit('updataeState', {
                    theMovie : {}
                })
            } finally {
                commit('updateState', {
                    loading : false
                })
            }
        }
    }
}

// _ : 현재 파일에서만 사용된다
function _fetchMovie(payload){
    const {title, type, year, page, id} = payload;
    const OMDB_API_KEY = '429579cf';
    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((res) => {
                if(res.data.Error){
                    reject(res.data.Error)
                }
                resolve(res)
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}