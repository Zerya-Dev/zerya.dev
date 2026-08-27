<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

type ContentNode = string | number | [string, Record<string, unknown>?, ...unknown[]] | {
  type?: string
  value?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: ContentNode[]
}

const allowedTags = new Set([
  'a',
  'blockquote',
  'code',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'ol',
  'p',
  'pre',
  'strong',
  'ul',
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function renderNode(node: ContentNode): ReturnType<typeof h> | string | number | null {
  if (typeof node === 'string' || typeof node === 'number') {
    return node
  }

  if (Array.isArray(node)) {
    const [tag, properties, ...children] = node
    if (!allowedTags.has(tag)) {
      return null
    }
    return h(tag, properties, children.map(child => renderNode(child as ContentNode)))
  }

  if (node.type === 'text') {
    return node.value || ''
  }

  if (node.type === 'element' && node.tagName && allowedTags.has(node.tagName)) {
    return h(node.tagName, node.properties, (node.children || []).map(child => renderNode(child)))
  }

  return node.children ? h('div', node.type === 'root' ? undefined : {}, node.children.map(child => renderNode(child))) : null
}

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<unknown>,
      required: true,
    },
    class: {
      type: [String, Object] as PropType<string | Record<string, boolean>>,
      default: undefined,
    },
  },
  setup(props) {
    return () => {
      const document = isRecord(props.value) ? props.value : {}
      const body = isRecord(document.body) ? document.body : document
      const nodes = Array.isArray(document.body)
        ? document.body
        : Array.isArray(document.nodes)
          ? document.nodes
          : Array.isArray(body.value)
            ? body.value
            : Array.isArray(body.children)
              ? body.children
              : []

      return h('div', { class: props.class }, (nodes as ContentNode[]).map(node => renderNode(node)))
    }
  },
})
</script>
