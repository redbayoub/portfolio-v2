<template>
  <nav class="glass" :class="{ 'nav-active': navOpen, fixed: fixed }">
    <div class="container navbar">
      <a href="/">
        <div class="logo">
          <Logo />
          <span class="logo-text">Red Bayoub</span>
        </div></a
      >
      <ul class="nav-links" v-if="!empty" :class="{ 'nav-active': navOpen }">
        <li class="active">
          <a href="#home" @click="(e)=>smoothScrollToElement(e,0)">{{
            $t('home.label')
          }}</a>
        </li>
        <li>
          <a href="#work" @click="smoothScrollToElement">{{
            $t('work.label')
          }}</a>
        </li>
        <li>
          <a href="#skills" @click="smoothScrollToElement">{{
            $t('skills.label')
          }}</a>
        </li>
        <li>
          <a href="#about" @click="smoothScrollToElement">{{
            $t('about.label')
          }}</a>
        </li>
        <li>
          <a href="#contact" @click="smoothScrollToElement">{{
            $t('contact.label')
          }}</a>
        </li>
        <li>
          <LangChanger />
        </li>
      </ul>
      <LangChanger v-else />
      <div
        v-if="!empty"
        class="burger"
        :class="{ 'burger-toggle': navOpen }"
        @click.prevent="onBurgerClicked"
      >
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo'
import SvgIcon from '@/components/SvgPathIcon'
import LangChanger from '@/components/LangChanger'
import { smoothScrollToElement, toggleScroll } from '@/plugins/utils'
export default {
  name: 'navBar',
  components: {
    Logo,
    SvgIcon,
    LangChanger,
  },
  props: {
    empty: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      navOpen: false,
    }
  },

  methods: {
    smoothScrollToElement,
    toggleScroll,
    onBurgerClicked() {
      // toggle nav
      this.navOpen = !this.navOpen

      // animate links
      const navLinks = document.querySelectorAll('.nav-links li')

      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ''
        } else {
          const delay = index / 5 + 2
          link.style.animation = 'navLinkFade 0.5 ease forwards ' + delay + 's'
        }
      })

      // show/hide overlay
      const NAVBAR_OVERLAY_ID = 'navbar-overlay'
      var overlay = document.querySelector('#' + NAVBAR_OVERLAY_ID)
      if (!overlay) {
        // add overlay if doesn't exists
        overlay = document.createElement('div')
        overlay.id = NAVBAR_OVERLAY_ID
        const body = document.querySelector('body')
        body.appendChild(overlay)
      }
      overlay.classList.toggle('active')
      // toogle scroll
      this.toggleScroll()

      // toggle navbar when click on overlay
      overlay.addEventListener('click', () => this.onBurgerClicked())
    },
  },
}
</script>

<style lang="scss">
nav {
  background-color: var(--nav-bar-bg-color);
  z-index: 2;
  //box-shadow: inset 0 20px 20px -20px rgba($color: #ffd42a, $alpha: 0.7);
  transition: background-color 500ms linear;
}

nav.nav-active {
  background-color: var(--nav-bar-active-bg-color);
}

nav.fixed + * {
  margin-top: var(--nav-bar-height);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: var(--nav-bar-height);
}

.logo-text {
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-left: 10px;
  color: var(--text-color);
}

html[lang='ar'] .logo-text {
  margin-left: 0;
  margin-right: 10px;
}

.nav-links {
  position: absolute;
  justify-content: space-around;
  right: 0px;
  height: calc(100vh - var(--nav-bar-height));
  background-color: var(--nav-links-bg-color);
  top: var(--nav-bar-height);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  z-index: 2;
  margin: 0;
  padding: 0;
  transform: translateX(100%);
  transition: transform 0.5s ease-in;
  background-color: #363636;
}
.nav-active .nav-links {
  transform: translateX(0%);
}
.navbar .nav-links {
  padding: 0;
}
.nav-links li {
  opacity: 0;
  list-style: none;
}
.nav-links .active a {
  font-weight: bold;
  color: var(--text-color-highlighted);
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
}

html[lang='en'] .nav-links a {
  letter-spacing: 2px;
  text-transform: capitalize;
}

.burger {
  display: block;
  cursor: pointer;
}
.burger div {
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  margin: 5px;
  border-radius: 8px;
  transition: all 0.5s ease;
}

#navbar-overlay {
  background-color: rgb(0, 0, 0);
  opacity: 0;
  overflow: hidden;
  transition: opacity 1s linear;
}
#navbar-overlay.active {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: block;
  opacity: 0.8;
}

@media screen and (min-width: $md-brakepoint) {
  .burger {
    display: none;
  }

  .nav-links {
    width: 60%;
    position: inherit;
    height: inherit;
    background-color: transparent;
    flex-direction: inherit;
    align-items: inherit;
    transform: inherit;
    justify-content: space-between;
  }

  .nav-links li {
    opacity: 1;
  }
}
@media screen and (min-width: $lg-brakepoint) {
  .nav-links {
    width: 50%;
  }
}

@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

html[lang='ar'] nav {
  direction: rtl;
}

.burger-toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}
.burger-toggle .line2 {
  opacity: 0;
}
.burger-toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}
</style>