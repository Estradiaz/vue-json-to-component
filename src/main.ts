import Vue from 'vue'
import Json2Comp from './json2comp'
Vue.config.productionTip = false
Vue.component('json2comp', Json2Comp);

new Vue({
    render: h => h(Json2Comp, {
        attrs: {
            id: 'app',
        },
        props: {
            tag: 'div',
            items: [
                {
                    ElementTag: 'h1',
                    innerText: 'test',
                    id: 'title'
                },
                {
                    ElementTag: 'ul',
                    items: [
                        {
                            ElementTag: 'li',
                            innerText: 'test',
                            items: [{
                                ElementTag: 'ul',
                                items: [{
                                    ElementTag: 'li',
                                    innerText: 'test'
                                },      
                                {
                                    ElementTag: 'li',
                                    innerText: 'test'
                                }]
                            }]
                        },      
                        {
                            ElementTag: 'li',
                            innerText: 'test'
                        },      
                        {
                            ElementTag: 'li',
                            innerText: 'test'
                        },      
                    ],
                    innerText: 'overwrite'
                }
            ]
        }
    })
}).$mount('#app')