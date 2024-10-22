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
})


const errorMessage: Ref<string | undefined> = ref()

function checkRules() {
    errorMessage.value = validate(model.value, props.rules)
}
</script>

<template>
    <VmField :appendIcon :prependIcon :hint
        :error="errorMessage" :label :loading :prefix :suffix :iconColor>
        <input v-model="model" :id :name :disabled :readonly :required :type="inputType"
            :style="{ paddingLeft: prependIcon && '0px' }" @input="checkRules" />
        <template #prepend>
            <slot name="prepend" />
        </template>
        <template #label>
            <slot name="label" />
        </template>
    </VmField>
</template>
