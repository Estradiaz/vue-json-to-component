import {Vue, Component, Prop} from 'vue-property-decorator'
import { CreateElement, RenderContext, VNode } from 'vue';
export type AbstractElement = {
    [key: string]: any // passed as $attrs |  useable for assigned $props
    ElementTag: string
    slotName?: string
    innerText?: string
    items?: AbstractElement[]
    // listeners?: should be assigned through slots
}
@Component<List>({
    
    render(h){
        let renderItem = setRenderItemScope(this, h)
        let tag = this.tag
        || (this.$parent.$vnode && this.$parent.$vnode.tag)
        || (this.$parent.$el && this.$parent.$el.tagName)
        if(tag === undefined) throw Error(
            `tag prperty: ${tag} is invalid. Scope within element or pass valid component/ html tag as property`)
        return h(
            tag,
            {
                attrs: this.$attrs
            },
            this.items.map(renderItem)
        )
    }
})
export default class List extends Vue{
    @Prop(String) readonly tag?: string
    @Prop(Array) readonly items!: Array<AbstractElement>
}
export function setRenderItemScope(ctx: List, h: CreateElement){
    return function renderItem(item: AbstractElement): VNode | VNode[] {

        const {ElementTag, slotName, innerText, items: _items, ...attrs} = item;
        const scopedSlot = ctx.$scopedSlots[slotName || ElementTag]
        return (
            scopedSlot && scopedSlot({item})
        ) || h(
            ElementTag, 
            {
                attrs: attrs,
                slot: slotName || ElementTag,
                scopedSlots: ctx.$scopedSlots,
                on:{}
            }, 
            _items && _items.map(renderItem)
            || innerText && [
                //@ts-ignore
                ctx._v(innerText)
            ] 
            || []
        )
    }
}