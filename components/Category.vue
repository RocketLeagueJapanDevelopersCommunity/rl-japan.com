<template>
  <div class="wrapper">
    <div class="lists_title">
      カテゴリー
    </div>
    <ul class="lists">
      <nuxt-link
        v-for="category in categories"
        :key="category.id"
        :to="`/category/${category.id}/page/1`"
        :class="`link category_item ${category.id}`"
      >
        {{ category.name }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

<style scoped>
.wrapper {
  background: white;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 18px;
}
.lists_title {
  display: block;
  font-weight: bold;
  font-size: 18px;
  color: #2b2c30;
  padding-left: 16px;
  border-left: 2px solid var(--color-main-red);
}
.lists .category_item {
  position: relative;
  display: block;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  color: #2b2c30;
  border-radius: 5px;
  /* background: #fff; */
  /* background: var(--color-gray-light); */
  margin: 8px;
  margin-left: 0;
  /* box-shadow: 0px 0px 5px 1px rgba(43, 44, 48, 0.2); */
}

.lists .category_item:hover {
  background: var(--color-gray);
}

/* categories */
.lists .category_item.tips::before {
  background: var(--cat-tips);
}
.lists .category_item.tournament::before {
  background: var(--cat-tournament);
}
.lists .category_item.update::before {
  background: var(--cat-update);
}
.lists .category_item.information::before {
  background: var(--cat-information);
}
.lists .category_item.rlcs::before {
  background: var(--cat-rlcs);
}
.lists .category_item.interview::before {
  background: var(--cat-interview);
}
.lists .category_item.world-topics::before {
  background: var(--cat-world-topics);
}
.lists .category_item.offline-event::before {
  background: var(--cat-offline-event);
}
/* categories end */

.lists .category_item:before {
  position: absolute;
  top: calc(50% - 7.5px);
  left: 12.5px;
  width: 15px;
  height: 15px;
  content: '';
  border-radius: 50%;
  background: var(--color-main-red);
}
</style>
