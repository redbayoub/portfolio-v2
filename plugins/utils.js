// check if the current device is mobile using media queries
export const isMobile = () =>
  window.matchMedia('only screen and (max-width: 768px)').matches

// get the user locale
export const getUserLocale = () => {
  return localStorage.locale || navigator.browserLanguage || navigator.language
}

// change path from locale to another
export const changeLocale = (currentPath, newLocale) => {
  let newPath = null
  if (currentPath.indexOf('/', 1) == -1) {
    // replace with new lang
    newPath = '/' + newLocale
  } else {
    const currentPathWithoutLang = currentPath.substring(
      currentPath.indexOf('/', 1) + 1
    )
    newPath = '/' + newLocale + '/' + currentPathWithoutLang
  }
  return newPath
}

// return array of [r,g,b,a] from any valid color. if failed returns undefined
export const getColorValues = (color) => {
  if (!color) return
  if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0]
  if (color[0] === '#') {
    if (color.length < 7) {
      // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
      color =
        '#' +
        color[1] +
        color[1] +
        color[2] +
        color[2] +
        color[3] +
        color[3] +
        (color.length > 4 ? color[4] + color[4] : '')
    }
    return [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
      color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1,
    ]
  }
  if (color.indexOf('rgb') === -1) {
    // convert named colors
    var temp_elem = document.body.appendChild(document.createElement('fictum')) // intentionally use unknown tag to lower chances of css rule override with !important
    var flag = 'rgb(1, 2, 3)' // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
    temp_elem.style.color = flag
    if (temp_elem.style.color !== flag) return // color set failed - some monstrous css rule is probably taking over the color of our object
    temp_elem.style.color = color
    if (temp_elem.style.color === flag || temp_elem.style.color === '') return // color parse failed
    color = getComputedStyle(temp_elem).color
    document.body.removeChild(temp_elem)
  }
  if (color.indexOf('rgb') === 0) {
    if (color.indexOf('rgba') === -1) color += ',1' // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
    return color.match(/[\.\d]+/g).map(function (a) {
      return +a
    })
  }
}

/**
 * Scroll to the desired element without adding the hash to the url
 * @param {Event} e
 */
export const smoothScrollToElement = (e) => {
  e.preventDefault()
  const elementId = e.target.hash.substring(1)
  const el = document.getElementById(elementId)
  if (!el) return
  el.scrollIntoView({
    block: 'start',
    behaviour: 'smooth',
  })
}

/**
 * toggle scroll on the entire page
 * @param {String} elementSelector
 * @default html
 */
export const toggleScroll = (elementSelector = 'html') => {
  // toogle scroll
  const html = document.querySelector(elementSelector)
  html.classList.toggle('no-scroll')
}