import { describe, expect, test, beforeEach } from 'vitest'
import VmCheckbox from '../VmCheckbox.vue'
import { mount } from '@vue/test-utils'

describe('VmCheckbox component', () => {
  let wrapperConfig: any = null
  beforeEach(() => {
    wrapperConfig = {
      components: {
        VmCheckbox
      },
      template: ''
    }
  })
  test('mount component', async () => {
    wrapperConfig.template = '<VmCheckbox>My Checkbox</VmCheckbox>'
    const wrapper = mount(wrapperConfig, { attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('My Checkbox')
  })
  test('v-model test', async () => {
    wrapperConfig.template =
      '<div><VmCheckbox id="check" v-model="model">My Checkbox</VmCheckbox><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('.vm-checkbox-container')
    expect(input.exists()).toBe(true)
    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)

    await input.trigger('click')
    expect(span.text()).toBe('true')

    await input.trigger('click')
    expect(span.text()).toBe('false')
  })
  test('required test', async () => {
    wrapperConfig.template =
      '<div><VmCheckbox id="check" v-model="model" required>My Checkbox</VmCheckbox><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)

    const checkbox = wrapper.find('.vm-checkbox')
    expect(checkbox.exists()).toBe(true)
    expect(checkbox.classes()).toContain('vm-required')

    const result = wrapper.find('#result')
    expect(result.exists()).toBe(true)
    expect(result.text()).toBe('')
  })
  test('disabled test', async () => {
    wrapperConfig.template =
      '<div><VmCheckbox id="check" v-model="model" disabled>My Checkbox</VmCheckbox><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: true }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)

    const input = wrapper.find('.vm-checkbox-container')
    expect(input.exists()).toBe(true)

    const result = wrapper.find('#result')
    expect(result.exists()).toBe(true)
    expect(result.text()).toBe('true')

    await input.trigger('click')
    expect(result.text()).toBe('true')
  })
  test('hint message', async () => {
    wrapperConfig.template = '<VmCheckbox hint="My hint example">My Checkbox</VmCheckbox>'
    const wrapper = mount(wrapperConfig, { attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)

    const hint = wrapper.find('.vm-hint-message')
    expect(hint.exists()).toBe(true)
    expect(hint.text()).toBe('My hint example')
  })
})
