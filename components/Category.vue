<template>
  <div>
    <div class="lists_title">カテゴリー</div>
    <ul class="lists">
      <div class="category_bar">
        <nuxt-link
          v-for="category in categories"
          :key="category.id"
          :to="`/category/${category.id}/page/1`"
          :class="`link category_item ${category.id}`"
        >
          {{ category.name }}
        </nuxt-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.lists_title {
  position: relative;
  display: block;
  font-weight: bold;
  font-size: 18px;
  color: #2b2c30;
  border: 1px;
  margin: 18px;
}
.lists_title::before {
  position: absolute;
  bottom: -10px;
  width: 20px;
  height: 5px;
  content: '';
  background: #e9433b;
}
.lists .category_bar {
  display: flex;
  flex-wrap: wrap;
  margin: 4px 8px;
  margin-left: 38px;
}
.lists .category_bar .category_item {
  position: relative;
  display: inline-block;
  padding: 0.5rem 1rem 0.5rem 2rem;
  color: #2b2c30;
  border-radius: 5px;
  background: #fff;
  margin: 8px;
  margin-left: 0;
  box-shadow: 0px 0px 5px 1px rgba(43, 44, 48, 0.2);
}

/* categories */
.lists .category_bar .category_item.tips::before {
  background: var(--cat-tips);
}
.lists .category_bar .category_item.tournament::before {
  background: var(--cat-tournament);
}
.lists .category_bar .category_item.update::before {
  background: var(--cat-update);
}
.lists .category_bar .category_item.information::before {
  background: var(--cat-information);
}
.lists .category_bar .category_item.rlcs::before {
  background: var(--cat-rlcs);
}
.lists .category_bar .category_item.interview::before {
  background: var(--cat-interview);
}
.lists .category_bar .category_item.world-topics::before {
  background: var(--cat-world-topics);
}
.lists .category_bar .category_item.offline-event::before {
  background: var(--cat-offline-event);
}
/* categories end */

.lists .category_bar .category_item:before {
  position: absolute;
  top: calc(50% - 5px);
  left: 10px;
  width: 10px;
  height: 10px;
  content: '';
  border-radius: 50%;
  background: #e9433b;
}
</style>
