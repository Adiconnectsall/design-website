import '../style.css'
import { initChrome } from '../shared/chrome'
import { initCaseStudyPage } from '../shared/animations'

initChrome()

window.addEventListener('load', () => {
  initCaseStudyPage()
})
