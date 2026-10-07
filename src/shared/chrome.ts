/**
 * Shared nav + footer. Single source of truth so every page renders the
 * exact same header/footer markup instead of hand-copied HTML drifting
 * out of sync page to page.
 */

const RESUME_URL = '/Adi_Patil_Resume_Lead_UX_Designer.pdf'
const LINKEDIN_URL = 'https://www.linkedin.com/in/adi-patil/'
const EMAIL = 'adiconnects2@gmail.com'

const NAV_HTML = `
<nav class="nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="Adi — portfolio home">Adi</a>
    <ul class="nav-links">
      <li><a href="/#work">Work</a></li>
      <li><a href="mailto:${EMAIL}">Contact</a></li>
      <li><a href="${RESUME_URL}" target="_blank" rel="noopener">Resume</a></li>
    </ul>
  </div>
</nav>
`.trim()

const FOOTER_HTML = `
<footer class="footer" role="contentinfo">
  <div class="footer-inner">
    <span class="footer-copy">Adi Patil · Lead Product Designer</span>
    <nav class="footer-links" aria-label="Footer links">
      <a href="mailto:${EMAIL}">Email</a>
      <a href="${LINKEDIN_URL}" target="_blank" rel="noopener">LinkedIn</a>
    </nav>
  </div>
</footer>
`.trim()

export function initChrome(): void {
  const navSlot = document.getElementById('site-nav')
  if (navSlot) navSlot.outerHTML = NAV_HTML

  const footerSlot = document.getElementById('site-footer')
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML
}
