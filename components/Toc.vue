<template>
  <div v-if="visible" class="wrapper">
    <input type="checkbox" id="toggle1" />
    <div class="toggle-outer">
      <label for="toggle1" class="title">目次 [クリックして開く]</label>
    </div>
    <div class="toggle-inner">
      <ul class="lists">
        <li v-for="item in toc" :key="item.id" :class="`list ${item.name}`">
          <n-link v-scroll-to="`#${item.id}`" to>
            {{ item.text }}
          </n-link>
        </li>
      </ul>
    </div>
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
#toggle1 {
  cursor: pointer;
  display: none;
}
.toggle-inner {
  display: none;
}
.toggle-outer {
  cursor: pointer;
}
#toggle1:checked ~ .toggle-inner {
  display: block;
}
.wrapper {
  margin: 8px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  border: 2px solid #fbd9d8;
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
    content: '・';
    margin-right: 5px;
    color: black;
  }

  &.h2 {
    margin-left: 10px;
  }

  &.h3 {
    margin-left: 20px;
  }
}
</style>
