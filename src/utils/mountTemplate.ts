import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

export default async (component: any, template: string, options?: any) => {
  const newComponent = {
    template,
    components: {
      [component.name]: component
    }
  }
  const wrapper = mount(newComponent, options)

  await nextTick()

  return Promise.resolve(wrapper)
}
