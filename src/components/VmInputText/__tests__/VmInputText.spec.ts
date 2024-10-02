import mountTemplate from '@/utils/mountTemplate'
import { describe, expect, test } from 'vitest'
import VmInputText from '../VmInputText.vue'
import { nextTick } from 'vue'

describe('VmInputText component', () => {
  test('mount component', async () => {
    const template: string = '<VmInputText label="Component"/>'
    const wrapper = await mountTemplate(VmInputText, template, { data: () => ({ model: null }) })

    expect(wrapper.exists()).toBe(true)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Component')
  })
  test('v-model test', async () => {
    const template: string =
      '<div><VmInputText id="inputTest" label="Component" v-model="model"/><span id="result">{{ model }}</span></div>'
    const wrapper = await mountTemplate(VmInputText, template, { data: () => ({ model: null }) })

    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.exists()).toBe(true)
    await input.setValue('Example')

    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('Example')
  })
  test('disable component', async () => {
    const template: string =
      '<div><VmInputText id="inputTest" label="Component" disabled v-model="model"/><span id="result">{{ model }}</span></div>'
    const wrapper = await mountTemplate(VmInputText, template, { data: () => ({ model: null }) })

    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.exists()).toBe(true)
    await input.setValue('Example Test')

    const span = wrapper.find('#result')
    expect(span.exists()).toBe(true)
    expect(span.text()).toBe('')
  })
  test('show as password', async () => {
    const template: string =
      '<VmInputText type="password" id="inputTest" label="Component" v-model="model"/>'
    const wrapper = await mountTemplate(VmInputText, template, { data: () => ({ model: null }) })

    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.attributes('type')).toBe('password')
    const visibilityIcon = wrapper.find('span.vm-icon-field > transition-stub ')
    console.log(wrapper.html());
    expect(visibilityIcon.exists()).toBe(true)
    expect(visibilityIcon.text()).toBe('visibility')

    await visibilityIcon.trigger('click')
    expect(input.attributes('type')).toBe('text')
    expect(visibilityIcon.text()).toBe('visibility_off')

    await visibilityIcon.trigger('click')
    expect(input.attributes('type')).toBe('password')
    expect(visibilityIcon.text()).toBe('visibility')
  })
  test('required component', async () => {
    const template: string =
      '<VmInputText type="password" id="inputTest" label="Component" required/>'
    const wrapper = await mountTemplate(VmInputText, template)
    expect(wrapper.exists()).toBe(true)
    const input = wrapper.find('#inputTest')
    expect(input.attributes()).toHaveProperty('required')
  })
  test('slot label', async () => {
    const template: string =
      '<VmInputText type="password" id="inputTest" label="Component"><template #label>Label for slot</template></VmInputText>'
    const wrapper = await mountTemplate(VmInputText, template)
    expect(wrapper.exists()).toBe(true)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Label for slot')
  })
  test('counter flag enabled', async () => {
    const template: string =
      '<VmInputText type="password" counter id="inputTest" label="Component" v-model="model"/>'
    const wrapper = await mountTemplate(VmInputText, template, { data: () => ({ model: null }) })
    const input = wrapper.find('#inputTest')
    const counter = wrapper.find('div.vm-hint-counter')
    expect(counter.exists()).toBe(true)
    expect(counter.text()).toBe('0')

    await input.setValue('My input')

    expect(counter.text()).toBe('8')
  })
  test('max length property', async () => {
    const template: string =
      '<VmInputText type="password" counter id="inputTest" label="Component" max-length="30" v-model="model"/>'
    const wrapper = await mountTemplate(VmInputText, template, {
      data: () => ({ model: 'Example input' })
    })
    const counter = wrapper.find('div.vm-hint-counter')
    expect(counter.exists()).toBe(true)
    expect(counter.text()).toBe('13/30')
  })
})
