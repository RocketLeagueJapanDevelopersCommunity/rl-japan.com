<template>
  <div class="content">
    <!-- <picture v-if="item.ogimage">
      <source
        type="image/webp"
        :data-srcset="item.ogimage.url + '?w=560&fm=webp'"
      />
      <img
        :data-src="item.ogimage.url + '?w=560&q=100'"
        class="image lazyload"
        alt
      />
    </picture> -->
    <!-- <div class="title">{{ item.title }}</div>
    <button class="button">{{ item.id }}</button> -->
    {{ sliderItem }}
  </div>
</template>
<script>
export default {
  props: {
    sliderItem: {
      type: [Object, Array],
      required: false,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.content {
}
</style>
