<script setup lang="ts">
import { computed, ref, type ModelRef, type Ref, onMounted } from 'vue'
import VmIcon from '../VmIcon/VmIcon.vue'
import VmField from '../VmField/VmField.vue'
import { type Rule, validate } from '@/core/form'

defineOptions({
    name: 'VmInputText'
})

const model: ModelRef<string | undefined> = defineModel<number>()
let innerPrefix: Ref<string | undefined> = ref<string>();
let innerSuffix: Ref<string | undefined> = ref<string>();

const props = defineProps({
    id: String,
    appendIcon: String,
    prependIcon: String,
    disabled: Boolean,
    hint: String,
    label: String,
    loading: Boolean,
    name: String,
    prefix: String,
    readonly: Boolean,
    required: Boolean,
    rules: Array<Rule>,
    suffix: String,
    iconColor: String,
    decimals: {
        type: String || Number,
        default: 0,
    },
    type: String,
})

onMounted(() => {
    if(props.type === 'money'){
        innerPrefix.value = '$';
    } else{
        innerPrefix.value = props.prefix
    }

    if(props.type === 'percentage'){
        innerSuffix.value = "%";
    }else{
        innerSuffix.value = props.suffix;
    }
});

const errorMessage: Ref<string | undefined> = ref<string | undefined>()

function checkRules() {
    errorMessage.value = validate(model.value, props.rules);
}

const steps = computed(() => {
    let res = '0'
    if(props.decimals != 0 && props.type !== 'int'){
        res += '.';
        for(let i = (props.decimals - 1); i > 0; i--){
            res += '0'
        }
        res += '1'
    }

    return res;
})


function formatNumber(){
    if(props.type === 'float'){
        model.value = String((model.value).toFixed(Number.decimals));
        console.log('float')

    }else if(props.type === 'int'){
        model.value = String(Math.round(Number(model.value)));

    }else if(props.type === 'percentage'){
        model.value = String(Math.min(Math.max(Number(model.value), 0), 100));

    }else if(props.type === 'money'){
        // debugger
        model.value = Number(model.value).toFixed(Number(props.decimals));
        let parts = String(model.value).split(".");
        model.value = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + parts[1]

    }
}


</script>
<template>
    <VmField :appendIcon :prependIcon :hint
        :error="errorMessage" :label :loading :prefix="innerPrefix" :suffix="innerSuffix" :iconColor >
        <input
            v-model="model"
            @input="checkRules"
            @change="formatNumber"
            :id :name :disabled :readonly :required
            :style="{ paddingLeft: prependIcon && '0px' }"
            :step="steps"
            type="number"
        />
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #label>
            <slot name="label" />
        </template>
    </VmField>
    {{ props.type === 'percentage' }} -555 - {{ innerSuffix ? innerSuffix : 'hi' }}
</template>
