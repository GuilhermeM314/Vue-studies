// Para requisições ele irá buscar o main.js
import Vue from 'vue'
import App from './App'

new Vue ({
    render: h => h(App)
    
    /*render(createElement) {
        Forma extendida, a função h é fixa (createElement)
        return createElement(App)
    }*/
}).$mount("#app")// Mesma coisa do el: '#app'