// wrap js in IIFE to create local scope
(() => {

// cache width, height, and elements
let h = document.body.offsetHeight
let w = document.body.offsetWidth
const therapy = document.getElementsByClassName('site-therapy')[0].firstChild
const engineering = document.getElementsByClassName('site-engineering')[0].firstChild
let disableMouseMove = false
const innerSensitivy = 1.2
const outerSensitivity = 1.0
const outOfFocusSensitivity = 20

// reset the global w/h variables on resize
window.addEventListener('resize', function resize(e) {
  h = document.body.offsetHeight
  w = document.body.offsetWidth
})

// disable the mouse move effect if on a touch device
document.body.addEventListener('touchstart', function hover(e) {
  disableMouseMove = true
})

document.body.addEventListener('mousemove', function move(e) {
  if (disableMouseMove) return
  document.body.className = document.body.className.replace('mouse-move-disabled', '')

  // out-of-focus
  const clientX = e.clientX / outOfFocusSensitivity
  const clientY = e.clientY / outOfFocusSensitivity
  const modX = clientX % 10
  const modY = clientY % 10
  const outOfFocusX = modX < 5 ? modX : 5 - clientX % 5
  const outOfFocusY = modY < 5 ? modY : 5 - clientY % 5

  // distance to center
  const xCenter = Math.floor(Math.abs(e.clientX - w/2)) / outerSensitivity + w/4

  therapy.style.left = Math.min((xCenter - w/2) / innerSensitivy, 0) + outOfFocusX + 'px'
  engineering.style.left = Math.max((w - xCenter - w/2) / innerSensitivy, 5) + outOfFocusY + 'px'
})

const navContent = document.getElementsByClassName('nav-content')

// navigate to a section with a specific rel attribute
function navigate(rel) {

  // hide or show all content sections
  for (var i=0; i<navContent.length; i++) {
    (i => {
      let contentRel = navContent[i].getAttribute('rel')
      navContent[i].className = navContent[i].className.replace(/\bhide\b/, '')

      // hide other sections
      if (contentRel !== rel) {
        navContent[i].className += ' hide'
      }
      // scroll desired section into view
      else {
        // delay briefly so that other elements are hidden first
        // otherwise the calculations will be off
        setTimeout(() => {
          navContent[i].scrollIntoView(true)
        }, 10)
      }
    })(i)
  }
}

// click events
const navLinks = document.getElementsByClassName('nav-link')
for (var i=0; i<navLinks.length; i++) {
  (i => {
    navLinks[i].addEventListener('click', e => {
      e.preventDefault()

      // navigate to section
      const rel = navLinks[i].getAttribute('rel')
      navigate(rel)
    })
  })(i)
}

// surround an element in <strike>
function strike(el) {
  el.innerHTML = `<strike>${el.innerHTML}</strike>`
}

// parse the tour date from the tour item element
function getTourDate(el) {
  const space = el.innerText.trim().indexOf(' ')
  return new Date(el.innerText.trim().slice(0, space))
}

// strike through past tour dates
const tour = document.getElementById('tour')
for (var i=0; i<tour.childNodes.length; i++) {
  let item = tour.childNodes[i]
  if (getTourDate(item) < new Date()) {
    strike(item)
  }
}

})()
