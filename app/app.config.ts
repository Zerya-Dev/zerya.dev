const field = {
  slots: { root: 'w-full' },
  variants: {
    variant: {
      none: 'border-b border-paper/20 px-0 py-2.5 placeholder:text-paper/35 focus-visible:border-mint aria-invalid:border-riso-yellow',
    },
  },
}

export default defineAppConfig({
  ui: {
    colors: { primary: 'brand' },
    button: {
      slots: { base: 'cursor-pointer', trailingIcon: 'motion-safe:transition-transform' },
      compoundVariants: [{
        color: 'primary',
        variant: 'outline',
        class: {
          base: 'group justify-center gap-3 px-6 py-3 font-heading tracking-tight hover:bg-mint hover:text-ink active:bg-mint active:text-ink',
          trailingIcon: 'ms-0 size-4 motion-safe:group-hover:translate-x-1',
        },
      }, {
        color: 'neutral',
        variant: 'link',
        class: 'text-paper/65 hover:text-mint',
      }],
    },
    input: field,
    textarea: field,
    formField: { slots: { error: 'text-riso-yellow' } },
    modal: {
      variants: {
        overlay: { true: { overlay: 'bg-ink/70' } },
        fullscreen: {
          false: { content: 'max-w-md rounded-none shadow-2xl shadow-black/60 ring-0' },
          true: { content: 'border-0' },
        },
      },
      slots: {
        overlay: 'backdrop-blur-sm',
        content: 'divide-y-0 border border-paper/15 bg-ink text-paper',
        header: 'min-h-0 items-start px-7 pt-7 pb-0 sm:px-9 sm:pt-9',
        wrapper: 'pr-8',
        title: 'font-heading text-2xl font-normal tracking-tight text-paper',
        description: 'mt-2 text-base text-paper/55',
        close: 'top-5 right-5 text-paper/45 hover:bg-paper/10 hover:text-paper active:bg-paper/15',
        body: 'px-7 pt-7 pb-7 sm:px-9 sm:pb-9',
      },
    },
  },
})
