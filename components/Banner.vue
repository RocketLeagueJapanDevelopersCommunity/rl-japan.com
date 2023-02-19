<template>
  <div class="wrapper">
    <a
      v-if="banner && banner.image"
      :href="banner.url"
      class="link"
      target="banner"
      @click="bannerClick"
    >
      <picture v-if="banner.image">
        <source
          type="image/webp"
          :srcset="`${banner.image.url}?w=300&fm=webp, ${banner.image.url}?w=600&fm=webp 2x`"
        >
        <img :src="banner.image.url" class="image lazyload" :alt="banner.alt">
      </picture>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      required: false,
      default: undefined
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    bannerClick () {
      this.$gtag('event', 'banner_click', {
        event_category: 'banner',
        event_action: 'click',
        event_label: this.banner.url,
        value: 1
      })
    }
  }
}
</script>

<style scoped>
.image {
  width: 300px;
  max-width: 100%;
  height: auto;
}

.link {
  display: block;
}
.wrapper {
  margin-top: 20px;
}

@media (max-width: 1160px) {
  .wrapper {
    text-align: center;
    margin-top: 0;
  }
}
</style>
