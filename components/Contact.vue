<template>
  <div class="contact">
    <div class="container">
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
                rel="noopener noreferrer"
                role="button"
                @click="onContactLinkClicked(contact.type)"
              >
                <div class="contact-icon">
                  <SvgIcon :name="contact.iconName" fill="var(--text-color)" />
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
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
            <recaptcha
              id="recaptcha"
              class="recaptcha"
              data-theme="dark"
              @error="onCaptchaExpired"
              @success="onCaptchaVerified"
              @expired="onCaptchaExpired"
            />
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
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgPathIcon'
import CircularProgress from '@/components/CircularProgress'
import Alert from '@/components/Alert'
import MyFooter from '@/components/MyFooter'
export default {
  name: 'contact',
  components: {
    SvgIcon,
    CircularProgress,
    Alert,
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
    async onCaptchaExpired() {
      var recaptcha = this.$recaptcha
      await recaptcha.reset()
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
        .then(() => {
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
  background-color: #3f3f3f;
  padding: 2em 0;
}

html[lang='ar'] .contact {
  direction: rtl;
}

.contact .description {
  color: var(--text-color);
}

.contact-details {
  display: none;
  transition: all 0.3s ease-in;
  color: var(--text-color);
}

[lang='ar'] .contact-details {
  direction: ltr;
}

.contact-icon {
  border-radius: 50%;
  background-color: var(--bg-color);
  padding: 10px;
  @include defaultTransition();
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
      background-color: var(--bg-color);
      text-align: center;
      @include defaultTransition();
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
  background-color: var(--bg-color-darken);
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
  color: var(--text-color);
}

.form-control {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  box-sizing: border-box;
  resize: vertical;
  border: none;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: Montserrat, Arial, sans-serif;

  html[lang='ar'] & {
    font-family: Tajawal, Helvetica, Arial, sans-serif;
  }
  @include defaultTransition();
  &:focus,
  &:hover {
    outline-style: none;
    background-color: var(--bg-color-darken);
  }
  &::placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    font-size: 0.9em;
    text-transform: capitalize;
  }
}
</style>