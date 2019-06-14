import {Vue, Component, Prop} from 'vue-property-decorator'
export type AbstractElement = {
    [key: string]: any // passed as $attrs |  useable for assigned $props
    ElementTag: string
    slotName?: string
}
@Component<List>({

    render(h){

        let tag = this.tag 
        || (this.$parent.$vnode && this.$parent.$vnode.tag)
        || (this.$parent.$el && this.$parent.$el.tagName)
        if(tag === undefined) throw Error(`tag prperty: ${tag} is invalid. Scope within valid vnode tag or pass valid component/ html tag as property`)
        return h(tag, this.items.map(item => {
            const {ElementTag, slotName, ...attrs} = item;
            console.log("slotName", slotName)
            return (this.$scopedSlots[slotName || ElementTag]
            //@ts-ignore
            && this.$scopedSlots[slotName || ElementTag]({item}))
            || h(ElementTag, {
                attrs: attrs,
                slot: slotName || ElementTag,
                scopedSlots: this.$scopedSlots
            })
        }))
    }
})
export default class List extends Vue{
    @Prop(String) readonly tag?: string
    @Prop(Array) readonly items!: Array<AbstractElement>
}