<template>
  <div class="wrapper">
    <div class="pageTitle">ピックアップ記事</div>
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.id}`" class="link">
          <picture v-if="content.ogimage">
            <source
              type="image/webp"
              :data-srcset="
                content.ogimage.url + '?w=400&h=210&fm=webp&fit=crop&q=0'
              "
            />
            <img
              :data-src="content.ogimage.url + '?w=400&h=210&fit=crop&q=0'"
              class="image lazyload"
              alt
            />
          </picture>
          <p class="title">{{ content.title }}</p>
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
    padding-bottom: 40px;
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
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link {
    display: block;
    padding: 10px;
    &:hover {
      border-radius: 5px;
      background: #eee;
    }
  }

  .image {
    width: 280px;
    border-radius: 5px;
  }

  .title {
    padding-top: 10px;
  }
}
@media (min-width: 520px) and (max-width: 1160px) {
  .wrapper {
    padding-top: 40px;
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
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link {
    display: flex;
    padding: 10px;
  }

  .image {
    width: 140px;
    border-radius: 5px;
  }

  .title {
    padding-left: 20px;
  }
}
@media (max-width: 520px) {
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
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .link {
    display: block;
    padding: 10px;
  }

  .image {
    width: 100%;
    border-radius: 5px;
  }

  .title {
    padding-top: 10px;
  }
}
</style>
