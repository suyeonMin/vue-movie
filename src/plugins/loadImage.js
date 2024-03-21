export default {
    install(app) {
        app.config.globalProperties.$loadImage = src => {
            return new Promise( resolve => {
                const img = document.createElement('img');
                img.scr = src;
                img.addEventListener('load', () => {
                    // 로드 완료!
                    resolve()
                    console.log('done!')
                })
            })
        }
    }
}