<template>
  <div v-if="visible" class="wrapper">
    <h4 class="title">目次</h4>
    <ul class="lists">
      <li v-for="item in toc" :key="item.id" :class="`list ${item.name}`">
        <n-link v-scroll-to="`#${item.id}`" to>
          {{ item.text }}
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    toc: {
      type: Array,
      required: true,
      default: () => [],
    },
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fdeceb;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 40px;
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
  border-radius: 5px;
}

.list {
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px solid #fbd9d8;

  a:hover {
    color: #e9433b;
  }

  &::before {
    content: '-';
    margin-right: 5px;
    color: #fbd9d8;
  }

  &.h2 {
    margin-left: 10px;
  }

  &.h3 {
    margin-left: 20px;
  }
}
</style>
