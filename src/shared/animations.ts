/**
 * Shared GSAP setup for every page. One module, imported by each page's
 * thin entry script, instead of a hand-copied <script> block per page.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
function ensureRegistered(): void {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Hero entrance: stagger direct .gsap-fade children of .hero in order. */
export function initHeroFade(selector = '.hero .gsap-fade'): void {
  if (reducedMotion()) return
  ensureRegistered()
  const els = document.querySelectorAll<HTMLElement>(selector)
  if (!els.length) return
  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.12,
    delay: 0.1,
  })
}

/** Scroll-triggered fade for whole sections (problem, research, outcomes, etc). */
export function initScrollReveal(
  selector = '.section.gsap-fade, .stat-strip.gsap-fade, .outcome-section'
): void {
  if (reducedMotion()) return
  ensureRegistered()
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
    })
  })
}

/** Staggered reveal for a repeated list of blocks (decision blocks, cards). */
export function initStaggerReveal(selector: string, staggerStep = 0.08): void {
  if (reducedMotion()) return
  ensureRegistered()
  document.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.55,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      delay: i * staggerStep,
    })
  })
}

/** Count-up for any element with data-target (+ optional data-prefix/suffix/decimals). */
export function initCounters(selector = '.js-counter'): void {
  if (reducedMotion()) return
  ensureRegistered()
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const target = parseFloat(el.dataset.target || '0')
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0

    function format(val: number): string {
      return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-US')
    }

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter() {
        const proxy = { val: 0 }
        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate() {
            el.textContent = prefix + format(proxy.val) + suffix
          },
        })
      },
    })
  })
}

/** Home hero: split the headline into words and stagger them in on load. */
export function initHeroWordStagger(selector = '.hero-hl'): void {
  if (reducedMotion()) return
  ensureRegistered()
  const hl = document.querySelector<HTMLElement>(selector)
  if (!hl) return

  hl.innerHTML = (hl.textContent || '')
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="hl-w" style="display:inline-block">${w}</span>`)
    .join(' ')

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-avail', { opacity: 0, y: 8, duration: 0.4 })
    .from('.hl-w', { opacity: 0, y: 22, duration: 0.55, stagger: 0.038 }, '-=0.1')
    .from('.home-hero .hero-sub', { opacity: 0, y: 14, duration: 0.45 }, '-=0.28')
    .from('.hero-actions', { opacity: 0, y: 10, duration: 0.4 }, '-=0.22')
    .from('.hero-note', { opacity: 0, duration: 0.35 }, '-=0.15')
}

/** Full init for a case study page: hero fade, section reveal, decision stagger, counters. */
export function initCaseStudyPage(): void {
  initHeroFade()
  initScrollReveal()
  initStaggerReveal('.decision-block')
  initCounters()
}

/** Home page: case-card grid reveal + contact section reveal (no hero). */
export function initHomeCardsReveal(): void {
  if (reducedMotion()) return
  ensureRegistered()
  gsap.from('.case-card', {
    scrollTrigger: { trigger: '.cases-grid', start: 'top 78%' },
    opacity: 0,
    y: 36,
    stagger: 0.13,
    duration: 0.6,
    ease: 'power2.out',
  })
  gsap.from('.contact-inner', {
    scrollTrigger: { trigger: '.contact', start: 'top 72%' },
    opacity: 0,
    y: 24,
    duration: 0.75,
    ease: 'power2.out',
  })
}

/** Full init for the home page: word-stagger hero, card reveal, contact reveal, counters. */
export function initHomePage(): void {
  initHeroWordStagger('.hero-hl')
  initHomeCardsReveal()
  initCounters()
}
