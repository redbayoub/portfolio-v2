<template>
  <div v-if="!isClosed" :dir="direction" class="alert" :class="'alert-' + type">
    <button class="close btn-icon" @click.prevent="isClosed = !isClosed">
      <SvgIcon name="close" fill="white" />
    </button>
    <!--  <button type="button" class="close" @click.prevent="isClosed = !isClosed">
      ×
    </button> -->
    <strong class="alert-title">{{ title + ":" }}</strong> {{ content }}
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgPathIcon";
export default {
  name: "alert",
  components: {
    SvgIcon,
  },
  props: {
    type: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isClosed: false,
    };
  },
  computed: {
    direction: function () {
      return this.$i18n.locale == "ar" ? "rtl" : "ltr";
    },
    title: function () {
      switch (this.type.toLowerCase()) {
        case "success":
          return this.$t("alert.success_title");
          break;
        case "info":
          return this.$t("alert.info_title");
          break;
        case "warning":
          return this.$t("alert.warning_title");
          break;
        case "error":
          return this.$t("alert.error_title");
          break;
        default:
          return "";
          break;
      }
    },
  },
};
</script>

<style >
.alert .alert-title {
  text-transform: capitalize;
}
.alert .close {
  margin: 0;
  float: right;
  padding: 6px;
  border: none;

  background-color: rgb(124, 124, 124);
  transition: background-color 0.3s ease-in;
}
.alert .close:hover {
  background-color: rgb(43, 43, 43);
}
.alert .close svg {
  --icon-size: 13px;
  width: var(--icon-size);
  height: var(--icon-size);
}

html[lang="ar"] .alert .close {
  float: left;
}

.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
}

.alert-success {
  background-color: #dbf6d3;
  border-color: #aed4a5;
  color: #569745;
}

.alert-info {
  background-color: #d9edf7;
  border-color: #98cce6;
  color: #3a87ad;
}

.alert-warning {
  background-color: #fcf8e3;
  border-color: #f1daab;
  color: #c09853;
}

.alert-error {
  background-color: #f2dede;
  border-color: #e0b1b8;
  color: #b94a48;
}
</style>