<template>
  <div class="wrapper">
    <div class="pageTitle">最新の記事</div>
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.id}`" class="link">
          {{ content.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
@media (min-width: 1160px) {
  .wrapper {
    position: sticky !important;
    top: 115px;
  }

  .pageTitle {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    margin: 18px;
    margin-left: 0;
    padding-left: 18px;
    padding: 18px 0 0;
    border-top: 2px solid #000;
  }

  .list {
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    margin: 18px;
    margin-left: 0;
    padding: 18px 0 0;
    border-top: 2px solid #000;
  }

  .list {
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }
}
@media (max-width: 820px) {
  .wrapper {
    padding: 40px 0;
  }

  .pageTitle {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    margin: 18px;
    margin-left: 0;
    padding: 18px 0 0;
    border-top: 2px solid #000;
  }

  .list {
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }
}
</style>
