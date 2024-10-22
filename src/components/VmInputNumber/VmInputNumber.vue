<script setup lang="ts">
import { computed, ref, type ModelRef, type Ref } from 'vue'
import VmIcon from '../VmIcon/VmIcon.vue'
import VmField from '../VmField/VmField.vue'
import { type Rule, validate } from '@/core/form'

defineOptions({
    name: 'VmInputText'
})

const model: ModelRef<string | undefined> = defineModel<string>()

const inputType = 'number';

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
})


const errorMessage: Ref<string | undefined> = ref()

function checkRules() {
    errorMessage.value = validate(model.value, props.rules)
}

const steps = computed(() => {
    let res = '0'
    if(props.decimals != 0){
        res += '.';
        for(let i = (Number(props.decimals) - 1); i > 0; i--){
            res += '0'
        }
        res += '1'
    }

    return res;
})

</script>

<template>
    <VmField :appendIcon :prependIcon :hint
        :error="errorMessage" :label :loading :prefix :suffix :iconColor>
        <input
            v-model="model"
            @input="checkRules"
            :id :name :disabled :readonly :required
            :type="inputType"
            :style="{ paddingLeft: prependIcon && '0px' }"
            :step="steps"
        />
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #label>
            <slot name="label" />
        </template>
    </VmField>
</template>
