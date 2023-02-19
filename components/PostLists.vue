<template>
  <ul>
    <li v-for="content in contents" :key="content.id" class="list">
      <nuxt-link :to="`/${content.id}`" class="link">
        <picture v-if="content.ogimage">
          <source
            type="image/webp"
            :data-srcset="
              content.ogimage.url + '?w=400&h=210&fm=webp&fit=crop&q=0'
            "
          >
          <img
            src="@/static/images/loading.gif"
            :data-src="content.ogimage.url + '?w=400&h=210&fit=crop&q=0'"
            class="ogimage lazyload"
            alt
            width="630"
            height="1200"
          >
        </picture>
        <dl class="content">
          <dt class="title">
            {{ content.title }}
          </dt>
          <dd>
            <Meta
              :created-at="content.publishedAt || content.createdAt"
              :author="content.writer !== null ? content.writer : ''"
              :category="content.category"
            />
          </dd>
        </dl>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

<style scoped>
@media (min-width: 1160px) {
  .list {
    margin: 20px 0;
    padding: 20px;
    border-radius: 5px;
    background: white;
  }

  .list:hover {
    transition: 1s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .link {
    display: flex;
    justify-content: space-between;
  }
  .ogimage {
    width: 335px;
    height: 176px;
    border-radius: 5px;
    object-fit: cover;
  }

  .content {
    flex: 1;
    margin-left: 40px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .list {
    margin: 20px 0;
    padding: 20px;
    border-radius: 5px;
    background: white;
  }
  .link {
    display: flex;
    justify-content: space-between;
  }

  .ogimage {
    width: 335px;
    height: 176px;
    border-radius: 5px;
    object-fit: cover;
  }

  .content {
    flex: 1;
    margin-left: 40px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (max-width: 820px) {
  .list {
    margin: 20px 0;
    padding: 20px;
    border-radius: 5px;
    background: white;

    &:first-child {
      padding-top: 16px;
    }
  }
  .ogimage {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    object-fit: cover;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
}
</style>
