module.exports = {
    evn: {
        brower: true,
        node: ture
    },
    extends: [
        //코드 규칙 넣는 곳
        
        //vue
        //'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        //'plugin:vue/vue3-recommended',

        //js
        'eslint: recommended'
    ],
    parserOption: {
        parser: 'babel-eslint'
    },
    rules: {
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html" : {
                "void" : "always",
                "normal" : "never",
                "component" : "always"
            },
            "svg" : "always",
            "math" : "always"
        }]
    }
}