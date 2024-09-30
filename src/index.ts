import type { App } from 'vue'
import * as components from '@/components'
import { directives, type MosaicDirective } from '@/directives'

function install(app: App) {
  Object.values(components).forEach((cmp: any) => app.component(cmp))
  directives.forEach((dir: MosaicDirective) => app.directive(dir.name, dir.directive))
}

export function createMosaic() {
  return install
}
