import { beforeEach, describe, expect, test } from 'vitest'
import VmInputNumber from '../VmInputNumber.vue'
import { mount } from '@vue/test-utils'

describe('VmInputNumber component', () => {
  let wrapperConfig: any = null
  beforeEach(() => {
    wrapperConfig = {
      components: {
        VmInputNumber
      },
      template: ''
    }
  })
  test('mount component', async () => {
    wrapperConfig.template = '<VmInputNumber label="Component"/>'
    const wrapper = mount(wrapperConfig, { attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Component')
  })
  test('v-model test', async () => {
    wrapperConfig.template =
      '<div><VmInputNumber id="test" label="Input Number" v-model="model" decimals="2"/><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#test')
    expect(input.exists()).toBe(true)
    await input.setValue('123512.4323')

    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('123512.43')

    await input.setValue('')
    expect(span.text()).toBe('')
  })
  test('disabled component', async () => {
    wrapperConfig.template =
      '<div><VmInputNumber id="test" label="Input Number" v-model="model" disabled decimals="2"/><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })


    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#test')
    expect(input.exists()).toBe(true)
    await input.setValue('123512.4323')
    
    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('')
  })
})
