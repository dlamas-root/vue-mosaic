import { describe, expect, test, beforeEach } from 'vitest'
import VmInputText from '../VmInputText.vue'
import { mount } from '@vue/test-utils'

describe('VmInputText component', () => {
  let wrapperConfig: any = null
  beforeEach(() => {
    wrapperConfig = {
      components: {
        VmInputText
      },
      template: ''
    }
  })
  test('mount component', async () => {
    wrapperConfig.template = '<VmInputText label="Component"/>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Component')
  })
  test('v-model test', async () => {
    wrapperConfig.template =
      '<div><VmInputText id="inputTest" label="Component" v-model="model"/><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.exists()).toBe(true)
    await input.setValue('Example')

    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('Example')
  })
  test('disable component', async () => {
    wrapperConfig.template =
      '<div><VmInputText id="inputTest" label="Component" disabled v-model="model"/><span id="result">{{ model }}</span></div>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.exists()).toBe(true)
    await input.setValue('Example Test')

    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('')
  })
  test('show as password', async () => {
    wrapperConfig.template =
      '<VmInputText type="password" id="inputTest" label="Component" v-model="model"/>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.attributes('type')).toBe('password')
    const visibilityIcon = wrapper.find('span.vm-icon-field > transition-stub ')
    expect(visibilityIcon.exists()).toBe(true)
    expect(visibilityIcon.text()).toBe('visibility_off')

    await visibilityIcon.trigger('click')
    expect(input.attributes('type')).toBe('text')
    expect(visibilityIcon.text()).toBe('visibility')

    await visibilityIcon.trigger('click')
    expect(input.attributes('type')).toBe('password')
    expect(visibilityIcon.text()).toBe('visibility_off')
  })
  test('required component', async () => {
    wrapperConfig.template =
      '<VmInputText type="password" id="inputTest" label="Component" required/>'
    const wrapper = mount(wrapperConfig, { attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.attributes()).toHaveProperty('required')
  })
  test('required message as hint', async () => {
    wrapperConfig.template = 
      '<VmInputText type="password" id="inputTest" label="Component" required/>'
    const wrapper = mount(wrapperConfig, { attachTo: document.body })

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
  
    const input = wrapper.find('#inputTest')
    expect(input.exists()).toBe(true)
    await input.setValue('Example')
    await input.setValue('')
    await wrapper.vm.$nextTick()
    const hint = wrapper.find('span.vm-hint-message')
    expect(hint.exists()).toBe(true)
    expect(hint.classes()).toContain('vm-hint-error')
    expect(hint.text()).toBe('This field is required')
  })
  test('slot label', async () => {
    wrapperConfig.template =
      '<VmInputText type="password" id="inputTest" label="Component"><template #label>Label for slot</template></VmInputText>'
    const wrapper = mount(wrapperConfig)

    await wrapper.vm.$nextTick()
    expect(wrapper.exists()).toBe(true)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Label for slot')
  })
  test('counter flag enabled', async () => {
    wrapperConfig.template =
      '<VmInputText type="password" counter id="inputTest" label="Component" v-model="model"/>'
    const wrapper = mount(wrapperConfig, { data: () => ({ model: null }), attachTo: document.body })

    await wrapper.vm.$nextTick()
    const input = wrapper.find('#inputTest')
    const counter = wrapper.find('div.vm-hint-counter')
    expect(counter.exists()).toBe(true)
    expect(counter.text()).toBe('0')

    await input.setValue('My input')

    expect(counter.text()).toBe('8')
  })
  test('max length property', async () => {
    wrapperConfig.template =
      '<VmInputText type="password" counter id="inputTest" label="Component" max-length="30" v-model="model"/>'
    const wrapper = mount(wrapperConfig, {
      data: () => ({ model: 'Example input' }),
      attachTo: document.body
    })

    await wrapper.vm.$nextTick()
    const counter = wrapper.find('div.vm-hint-counter')
    expect(counter.exists()).toBe(true)
    expect(counter.text()).toBe('13/30')
  })
})
