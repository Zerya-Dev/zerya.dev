const field = {
  slots: { root: 'w-full' },
  variants: {
    variant: {
      // Errors show only as the ember underline. `ring-0!` beats the error ring that a form field
      // adds through a default compound variant, which app config cannot override.
      none: 'border-b border-paper/15 px-0 py-2.5 text-lg placeholder:text-dimmed ring-0! focus-visible:border-aurora aria-invalid:border-ember',
    },
  },
}

export default defineAppConfig({
  ui: {
    colors: { primary: 'brand' },
    button: {
      slots: { base: 'cursor-pointer', trailingIcon: 'motion-safe:transition-transform' },
      compoundVariants: [{
        color: 'neutral',
        variant: 'solid',
        class: {
          base: 'group justify-center gap-3 bg-paper px-6 py-3 font-heading tracking-tight text-ink hover:bg-aurora-light active:bg-aurora-light',
          trailingIcon: 'ms-0 size-4 motion-safe:group-hover:translate-x-1',
        },
      }, {
        color: 'neutral',
        variant: 'link',
        class: 'text-paper/65 hover:text-aurora',
      }],
    },
    input: field,
    textarea: field,
    formField: { slots: { label: 'text-xs font-medium text-paper/55', container: 'mt-1', error: 'text-ember' } },
    modal: {
      variants: {
        overlay: { true: { overlay: 'bg-night/80' } },
        fullscreen: {
          false: { content: 'max-w-lg rounded-none shadow-2xl shadow-black/60 ring-0' },
          true: { content: 'border-0' },
        },
      },
      slots: {
        overlay: 'backdrop-blur-sm',
        content: 'divide-y-0 border border-paper/10 bg-night text-paper',
        header: 'min-h-0 items-start px-7 pt-7 pb-0 sm:px-9 sm:pt-9',
        wrapper: 'pr-8',
        title: 'font-heading text-[28px]/[36px] font-medium tracking-[-0.02em] text-paper',
        description: 'mt-3 text-base text-paper/65',
        close: 'top-5 right-5 text-dimmed hover:bg-paper/10 hover:text-paper active:bg-paper/15',
        body: 'px-7 pt-10 pb-7 sm:px-9 sm:pb-9',
      },
    },
  },
})
