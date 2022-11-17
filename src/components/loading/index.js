import Loading from './index.vue'

let loading = {}

loading.install = (Vue) =>{
    const LoadingConstructor = Vue.extend(Loading)

    const instance = new LoadingConstructor().$mount()

    instance.loadingShow = false

    Vue.prototype.$loading = {
        show(options){
            instance.loadingShow = true
            options = options || {};
            if (typeof options === 'string') {
                options = {
                    text: options
                }
            }
            if(options&&options.text){
                instance.loadingText = options.text
            }
            document.body.appendChild(instance.$el)
        },
        hide(){
            instance.loadingShow = false
        }
    }
}


export default loading
