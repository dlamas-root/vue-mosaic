<script setup lang="ts">
import { ref, computed, type Ref, onMounted, watch } from 'vue'
import VmField from '../VmField/VmField.vue'
import { type Rule, validate } from '@/core/form'

defineOptions({
  name: 'VmInputText'
})

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
    type: [Number, String],
    default: 0
  },
  type: {
    type: String,
    validator: (t: string) => ['float', 'integer', 'percentage'].includes(t),
    default: 'float'
  },
  modelValue: Number
})

const errorMessage: Ref<string | undefined> = ref<string | undefined>()
const internalValue: Ref<string | null | undefined> = ref()

const emit = defineEmits(['update:modelValue'])

const decimals: Ref<number> = computed(() => {
  let num: number = 0
  if (typeof props.decimals === 'string' && props.type !== 'integer') {
    num = parseInt(props.decimals)
  }
  return !isNaN(num) ? num : 0
})

watch(
  () => props.modelValue,
  () => (internalValue.value = humanFormat(props.modelValue))
)

onMounted(() => (internalValue.value = humanFormat(props.modelValue)))

function checkRules() {
  errorMessage.value = validate(internalValue.value, props.rules)
}

function clearNumber(value: string | null | undefined): number | null {
  if (value == null || value == undefined || value.trim() === '') return null
  const parts: string[] = value.split('.')
  let valueNumber = Number(parts[0].replace(',', ''))
  if (parts.length > 1) {
    valueNumber += Number('0.' + parts[1])
  }
  return valueNumber
}

function humanFormat(value: number | null | undefined): string | null {
  if (value == null || value == undefined) return null
  let v = value
  if (props.type === 'percentage') {
    v = Math.min(Math.max(value, 0), 100)
  }
  return Number(v).toLocaleString('en-US', {
    maximumFractionDigits: decimals.value,
    minimumFractionDigits: decimals.value
  })
}

function changeValue() {
  const num = clearNumber(internalValue.value)
  const numberFormated = humanFormat(num)
  internalValue.value = numberFormated
  const result = Number(num?.toFixed(decimals.value))
  emit('update:modelValue', isNaN(result) ? null : result)
}

function checkKey(evt: KeyboardEvent) {
  const isNumber: boolean = !isNaN(parseInt(evt.key))
  if (!isNumber && evt.key !== '.') {
    evt.preventDefault()
  }
}
</script>
<template>
  <VmField
    :appendIcon
    :prependIcon
    :hint
    :error="errorMessage"
    :label
    :loading
    :prefix
    :suffix
    :iconColor
  >
    <input
      v-model="internalValue"
      :id
      :name
      :disabled
      :readonly
      :required
      :style="{ paddingLeft: prependIcon && '0px' }"
      @change="changeValue"
      @keypress="checkKey"
      @input="checkRules"
    />
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #label>
      <slot name="label" />
    </template>
  </VmField>
</template>
