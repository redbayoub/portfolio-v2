<template>
  <div class="contact">
    <section class="container">
      <h1 class="section-title">{{ $t('contact.title') }}</h1>
      <div class="section-content">
        <div class="section-details">
          <p class="description">{{ $t('contact.description') }}</p>
          <div class="contact-list">
            <div
              v-for="(contact, index) in otherContacts"
              :key="index"
              class="contact-item"
            >
              <a
                name
                :href="contact.href"
                target="_blank"
                role="button"
                @click="onContactLinkClicked(contact.type)"
              >
                <div class="contact-icon">
                  <SvgIcon :name="contact.iconName" fill="black" />
                </div>
                <div class="contact-details">{{ contact.text }}</div>
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <Alert
            v-if="alert != null"
            :type="alert.type"
            :content="alert.message"
          />
          <form
            name="contactme"
            @submit.prevent="submitForm"
            data-netlify
            data-netlify-honeypot="bot-field"
            data-netlify-recaptcha="true"
          >
            <p style="display: none">
              <label
                >Don’t fill this out if you’re human: <input name="bot-field"
              /></label>
            </p>
            <div class="form-group">
              <label for="name">
                {{ $t('contact.form.name') }}
              </label>
              <input
                type="text"
                name="name"
                v-model="name"
                :disabled="sending"
                class="form-control custom-form-input"
                id="name"
                autocomplete
                minlength="3"
                :placeholder="$t('contact.form.palaceholder.name')"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">
                {{ $t('contact.form.email') }}
              </label>
              <input
                type="email"
                name="email"
                v-model="email"
                :disabled="sending"
                class="form-control custom-form-input"
                id="email"
                :placeholder="$t('contact.form.palaceholder.email')"
                required
                autocomplete
              />
            </div>
            <div class="form-group">
              <label for="subject">
                {{ $t('contact.form.subject') }}
              </label>
              <input
                type="text"
                name="subject"
                v-model="subject"
                :disabled="sending"
                class="form-control custom-form-input"
                id="subject"
                :placeholder="$t('contact.form.palaceholder.subject')"
                required
                autocomplete="off"
              />
            </div>
            <div class="form-group">
              <label for="message">
                {{ $t('contact.form.message') }}
              </label>
              <textarea
                class="form-control custom-form-input"
                minlength="3"
                :placeholder="$t('contact.form.palaceholder.message')"
                v-model="message"
                :disabled="sending"
                id="message"
                name="message"
                rows="6"
                required
                autocomplete="off"
              ></textarea>
            </div>

            <vue-recaptcha
              class="recaptcha"
              theme="dark"
              :language="$i18n.locale"
              :loadRecaptchaScript="true"
              @verify="onCaptchaVerified"
              @expired="onCaptchaExpired"
              ref="recaptcha"
              sitekey="6Leh6dkUAAAAAL2KFiSuCtfHHCB4ksMSd5nwms6P"
            ></vue-recaptcha>
            <CircularProgress
              v-if="sending"
              :content="$t('contact.form.sending')"
            />
            <button
              v-else
              type="submit"
              :disabled="recapToken == null"
              class="btn btn-primary"
            >
              {{ $t('contact.form.send') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgPathIcon'
import CircularProgress from '@/components/CircularProgress'
import Alert from '@/components/Alert'
import VueRecaptcha from 'vue-recaptcha'
import MyFooter from '@/components/MyFooter'
export default {
  name: 'contact',
  components: {
    SvgIcon,
    CircularProgress,
    Alert,
    VueRecaptcha,
    MyFooter,
  },
  data() {
    return {
      otherContacts: [
        {
          iconName: 'email',
          type: 'email',
          href: 'mailto:contact@redbayoub.com',
          text: 'contact@redbayoub.com',
        },
        {
          iconName: 'facebookLogo',
          type: 'facebook',
          href: 'https://www.facebook.com/RedBayoub',
          text: '/RedBayoub',
        },
        {
          iconName: 'twitterLogo',
          type: 'twitter',
          href: 'https://twitter.com/redbayoub',
          text: '@RedBayoub',
        },
        {
          iconName: 'linkdinLogo',
          type: 'linkdin',
          href: 'https://www.linkedin.com/in/redbayoub/',
          text: '/RedBayoub',
        },
        {
          iconName: 'githubLogo',
          type: 'github',
          href: 'https://github.com/redbayoub',
          text: '/RedBayoub',
        },
      ],
      recapToken: null,
      sending: false,
      alert: null,
      name: null,
      email: null,
      subject: null,
      message: null,
    }
  },
  methods: {
    onAlertClosed() {
      this.alert = null
    },
    onContactLinkClicked(contactType) {
      this.$ga.event({
        eventCategory: 'open_link',
        eventAction: 'opened ' + contactType,
      })
    },
    onCaptchaVerified(response) {
      this.recapToken = response
    },
    onCaptchaExpired() {
      var recaptcha = this.$refs.recaptcha
      recaptcha.reset()
      this.recapToken = null
    },

    submitForm(e) {
      if (this.recapToken == null) return
      function encode(data) {
        return Object.keys(data)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
          )
          .join('&')
      }

      const payload = {
        'g-recaptcha-response': this.recapToken,
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
      }
      const self = this
      this.sending = true
      this.alert = null
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contactme',
          ...payload,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((json) => {
              throw json
            })
          }
          return res.json()
        })
        .then((data) => {
          self.alert = {
            message: self.$t('contact.form.sending_success'),
            type: 'success',
          }
          // clear inputs
          self.name = null
          self.email = null
          self.subject = null
          self.message = null
          self.trackContactSucceeded()
        })
        .catch((error) => {
          console.error(error)
          self.alert = {
            message: self.$t('contact.form.sending_error'),
            type: 'error',
          }
        })
        .finally(() => {
          // set sending to false
          self.sending = false
          // reset captcha
          self.onCaptchaExpired()
        })
    },
    trackContactSucceeded() {
      this.$ga.event({
        eventCategory: 'click',
        eventAction: 'contact',
        eventLabel: 'contact succeeded',
      })
    },
  },
}
</script>

<style lang="scss">
.contact {
  background-color: #363636;
  color: white;
}

html[lang='ar'] .contact {
  direction: rtl;
}

.contact .description {
  color: #a2a2a2;
}

.contact-details {
  display: none;
  transition: all 0.3s ease-in;
}

[lang='ar'] .contact-details {
  direction: ltr;
}

.contact-icon {
  border-radius: 50%;
  background-color: white;
  padding: 10px;
  transition: all 0.3s ease-in;
}
.contact-icon svg {
  display: block;
  margin: 0 auto;
}
.contact-list {
  margin: 2em 0;
  display: flex;
  justify-content: space-between;
}

.contact .recaptcha {
  margin: 1em 0;
}
.contact-form {
  width: 100%;
}
@media screen and (min-width: $md-brakepoint) {
  .contact .section-content {
    display: flex;
    a {
      text-decoration: none;
      color: black;
    }

    .section-details {
      padding-right: 2em;
    }

    .contact-item,
    a {
      display: flex;
      margin-bottom: 1em;
      justify-content: flex-start;
      align-items: center;
    }

    .contact-details {
      margin-left: 0.5em;
      display: block;
      width: 300px;
      padding: 10px;
      border-radius: 800000px;
      background-color: white;
      text-align: center;
    }
  }

  .contact .contact-list {
    flex-direction: column;
  }

  html[lang='ar'] .contact-details {
    margin-left: 0;
    margin-right: 0.5em;
  }

  html[lang='ar'] .section-details {
    padding-right: 0 !important;
    padding-left: 2em;
  }
}

.contact-list a:hover .contact-icon,
.contact-list a:hover .contact-details {
  background-color: #fff4ca;
}

/* form styling */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}
form label {
  padding-bottom: 0.5em;
  text-transform: capitalize;
}

input:focus,
textarea:focus {
  background-color: var(--primary-light-bg-color);
  outline-color: var(--primary-bg-color);
}

input[type='text'],
input[type='email'],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}
::placeholder {
  text-transform: capitalize;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-transform: capitalize;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  text-transform: capitalize;
}
</style>