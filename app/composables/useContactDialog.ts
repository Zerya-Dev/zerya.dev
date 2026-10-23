import type { ContactSource } from '#shared/utils/contact'

export function useContactDialog() {
  const isOpen = useState('contact-dialog-open', () => false)
  const source = useState<ContactSource>('contact-dialog-source', () => 'website')

  function open(from: ContactSource = 'website') {
    source.value = from
    isOpen.value = true
  }

  return { isOpen, source, open }
}
