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
    border: 1px;
    margin: 18px;
    margin-left: 0;
  }
  .pageTitle::before {
    position: absolute;
    bottom: -10px;
    width: 20px;
    height: 5px;
    content: '';
    background: #e9433b;
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
    border: 1px;
    margin: 18px;
    margin-left: 0;
  }
  .pageTitle::before {
    position: absolute;
    bottom: -10px;
    width: 20px;
    height: 5px;
    content: '';
    background: #e9433b;
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
    border: 1px;
    margin: 18px;
    margin-left: 0;
  }
  .pageTitle::before {
    position: absolute;
    bottom: -10px;
    width: 20px;
    height: 5px;
    content: '';
    background: #e9433b;
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
