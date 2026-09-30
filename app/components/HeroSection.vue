<template>
  <section class="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink">
    <picture>
      <source srcset="/img/aurora-still.webp" media="(prefers-reduced-motion: reduce)">
      <NuxtImg
        provider="none"
        class="pointer-events-none absolute bottom-[calc(14.5rem-30.7vw)] -left-[145vw] -z-10 h-auto w-[260vw] max-w-none select-none blur-[0.07448vw] [mask-image:linear-gradient(to_bottom,transparent,black_48%),linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [mask-composite:intersect] md:bottom-0 md:left-1/2 md:w-[max(100vw,160svh)] md:-translate-x-1/2 md:blur-[max(0.02865vw,0.04583svh)] md:[mask-image:linear-gradient(to_bottom,transparent,black_34%),linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        src="/img/aurora-loop.webp"
        width="1920"
        height="1080"
        alt=""
        fetchpriority="high"
      /></picture>
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[url(/img/grain.svg)] opacity-[0.09] mix-blend-overlay" aria-hidden="true" />

    <div class="motion-safe:animate-rise">
      <SiteNavbar />
    </div>

    <div class="px-6 pt-[10svh] md:px-12 md:pt-[16svh]">
      <h1 class="max-w-[18ch] text-[clamp(2.4rem,5.6vw,6rem)] leading-[1.02] tracking-[-0.035em] text-paper">
        <span class="motion-safe:animate-rise block font-light text-paper/55 motion-safe:[animation-delay:300ms]">Software to nie cel.</span>
        <span class="motion-safe:animate-rise block motion-safe:[animation-delay:480ms]">
          Liczy się problem,
          <span class="whitespace-nowrap">który <span class="relative inline-block text-mint [--cell:max(2.5px,0.0625em)] [--dot:0.5] [mask-image:radial-gradient(circle,black_calc(var(--dot)*var(--cell)),transparent_calc(var(--dot)*var(--cell)+0.1*var(--cell)))] [mask-size:var(--cell)_var(--cell)] motion-safe:animate-vanish before:pointer-events-none before:absolute before:inset-0 before:translate-x-[0.045em] before:translate-y-[0.03em] before:text-riso-yellow before:opacity-85 before:mix-blend-screen before:content-[attr(data-text)] after:pointer-events-none after:absolute after:inset-0 after:-translate-x-[0.035em] after:-translate-y-[0.02em] after:text-riso-blue after:opacity-45 after:mix-blend-screen after:content-[attr(data-text)]" data-text="znika.">znika.</span></span>
        </span>
      </h1>
    </div>

    <div class="mt-auto grid gap-7 px-6 pb-8 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:pb-10">
      <div class="motion-safe:animate-rise max-w-md space-y-3 text-base leading-relaxed text-paper/75 motion-safe:[animation-delay:680ms] md:text-lg">
        <p>Zerya<sup class="text-[0.5em]" aria-label="copyright">&copy;</sup> tworzy własne produkty cyfrowe i&nbsp;oprogramowanie dla firm.</p>
      </div>

      <div class="motion-safe:animate-rise flex items-center justify-between gap-10 motion-safe:[animation-delay:820ms] md:justify-end">
        <span class="hidden font-mono text-[11px] tracking-[0.2em] text-paper/35 uppercase md:inline">
          69°N / ↓
        </span>
        <ContactDialog source="hero">
          <UButton
            variant="outline" size="xl" label="Porozmawiajmy" trailing-icon="i-lucide-arrow-right"
            class="w-full md:w-auto"
          />
        </ContactDialog>
      </div>
    </div>
  </section>
</template>
