import type { Directive } from 'vue'

export type MosaicDirective = {
  name: string
  directive: Directive
}

export const directives: Array<MosaicDirective> = []
