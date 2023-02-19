<template>
  <div class="wrapper">
    <div class="pageTitle">
      関連記事
    </div>
    <ul class="lists">
      <li v-for="blog in blogs" :key="blog.id" class="list">
        <nuxt-link :to="`/${blog.id}`" class="link">
          <picture>
            <source
              type="image/webp"
              :data-srcset="
                blog.ogimage.url + '?w=400&h=210&fm=webp&fit=crop&q=0'
              "
            >
            <img
              :data-src="blog.ogimage.url + '?w=400&h=210&fit=crop&q=0'"
              class="img lazyload"
              alt
            >
          </picture>
          <dl class="content">
            <dt class="title">
              {{ bytes(blog.title) }}
            </dt>
            <dd>
              <Meta
                :created-at="blog.createdAt"
                :author="blog.writer !== null ? blog.writer : ''"
                :category="blog.category"
              />
            </dd>
          </dl>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import countBytes from '@/plugins/count-bytes.js'
export default {
  props: {
    blogs: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    bytes (text) {
      const TRIMCOUNT = 30
      let r
      const c = countBytes(text, TRIMCOUNT)
      if (c.targetIndex > TRIMCOUNT) {
        r = text.slice(0, TRIMCOUNT) + '…'
      } else { r = text }
      return r
    }
  }
}
</script>

<style scoped>
.list {
  background: white;
}
@media (min-width: 1160px) {
  .pageTitle {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    margin: 18px 0;
    padding: 18px 0 0;
    border-top: 2px solid #000;
  }

  .lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .list {
    width: 340px;
    border-radius: 5px;
    transition: box-shadow 0.1s linear;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .img {
    width: 340px;
    height: 178px;
    border-radius: 5px 5px 0 0;
  }

  .content {
    padding: 10px 10px 0;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .pageTitle {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    margin: 18px 0;
    padding: 18px 0 0;
    border-top: 2px solid #000;
  }

  .lists {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .list {
    width: 300px;
    border-radius: 5px;
    transition: box-shadow 0.1s linear;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .img {
    width: 300px;
    height: 157px;
    border-radius: 5px 5px 0 0;
  }

  .content {
    padding: 10px 10px 0;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
@media (max-width: 820px) {
  .pageTitle {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    margin: 18px 0;
    padding: 18px 0 0;
    border-top: 2px solid #000;
  }

  .list {
    width: 100%;
    border-radius: 5px;
  }

  .img {
    width: 100%;
    border-radius: 5px;
  }

  .title {
    padding-top: 5px;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
