# vue-json-to-component

###Usage

    type AbstractElement = {
        [key: string]: any // passed as $attrs |  useable for assigned $props
        ElementTag: string
        slotName?: string
        innerText?: string
        items?: AbstractElement[]
    }

___

    class List extends Vue{
        @Prop(String) readonly tag?: string
        @Prop(Array) readonly items!: Array<AbstractElement>
    }
___
    <template>
        <json2comp :items="items" tag="table">
                <!-- <template #tr="{item}">
                    <tr :class="item.class">
                        overwrites following templates in
                        {{item.items}}
                    </tr>
                </template> -->
                <template #td="{item}">
                    <td :class="item.class">
                    {{item}}
                    </td>
                </template>
            </json2comp> 
    </template>


    <script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import { AbstractElement } from './json2comp';
    @Component
    export default class extends Vue{
        items: AbstractElement[] = [
            {
                ElementTag: 'thead',
                class:"thead-class",
                items: [
                    {
                        ElementTag: 'tr',
                        class:"tr-class",
                        items: [
                            {
                                ElementTag: 'th',
                                class:"th-class",
                                innerText: 'sampleText'
                            },
                            {
                                ElementTag: 'th',
                                class:"th-class",
                                items: [{

                                    ElementTag: 'h3',
                                    innerText: 'Title'
                                }
                                ]
                            },
                        ]
                    },      
                ]
            },
            {
                ElementTag: 'tbody',
                class:"tbody-class",
                items: [
                    {
                        ElementTag: 'tr',
                        class:"tr-class",
                        items: [
                            {
                                ElementTag: 'td',
                                class:"td-class",
                                items: [
                                    {ElementTag: 'input',
                                    type: 'text',
                                    value: ""}
                                ]
                            },
                            {
                                ElementTag: 'td',
                                class:"td-class",
                                items: [
                                    {ElementTag: 'input',
                                    type: 'date',
                                    value: ""}
                                ]
                            },
                        ]
                    },      
                ]
            },
        ]
    }

    </script>
