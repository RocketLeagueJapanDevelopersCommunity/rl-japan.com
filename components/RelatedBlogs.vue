<template>
  <div class="wrapper">
    <div class="pageTitle">関連記事</div>
    <ul class="lists">
      <li v-for="blog in blogs" :key="blog.id" class="list">
        <nuxt-link :to="`/${blog.id}`" class="link">
          <picture>
            <source
              type="image/webp"
              :data-srcset="
                blog.ogimage.url + '?w=400&h=210&fm=webp&fit=crop&q=0'
              "
            />
            <img
              :data-src="blog.ogimage.url + '?w=400&h=210&fit=crop&q=0'"
              class="img lazyload"
              alt
            />
          </picture>
          <dl class="content">
            <dt class="title">{{ blog.title }}</dt>
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
export default {
  props: {
    blogs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
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
