<template>
  <div class="related-blogs-wrapper">
    <div class="pageTitle">関連記事</div>
    <div class="container">
      <div v-for="article in blogs" :key="article.id" class="card">
        <nuxt-link :to="`/${article.id}`" class="link">
          <div class="card__header">
            <picture alt="card__image" class="card__image" width="600">
              <source
                type="image/webp"
                :data-srcset="
                  article.ogimage.url +
                  '?w=400&h=210&fm=webp&fit=fillmax&fill=blur&q=0'
                "
              />
              <img
                :data-src="
                  article.ogimage.url + '?w=400&h=210&fit=fillmax&fill=blur&q=0'
                "
                class="img lazyload"
                alt
              />
            </picture>
            <span class="tag">{{ article.category.name }}</span>
          </div>
          <div class="card__body">
            <h4>
              {{ bytes(article.title, 35) }}
            </h4>
            <p>{{ bytes(article.description, 45) }}</p>
          </div>
          <div class="card__footer">
            <Meta
              :created-at="article.createdAt"
              :author="article.writer !== null ? article.writer : ''"
              :category="''"
            />
          </div>
        </nuxt-link>
      </div>
    </div>
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
    bytes(text, trimcount) {
      let r
      const c = countBytes(text, trimcount)
      if (c.targetIndex > trimcount) {
        r = text.slice(0, trimcount) + '…'
      } else {
        r = text
      }
      return r
    }
  }
}
</script>

<style scoped>
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
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-block: 2rem;
  gap: 18px;
}
img {
  max-width: 100%;
  display: block;
  object-fit: cover;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(18rem, calc(18rem + 2vw), 20rem);
  overflow: hidden;
  box-shadow: none;
  border-radius: 1em;
  background: #ffffff;
  border: solid 1px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  }
}

.card__body {
  padding: 1rem;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card__header {
  position: relative;
}

.tag {
  position: absolute;
  bottom: 5px;
  right: 5px;
  padding: 0.25em 0.75em;
  font-size: 0.75rem;
  font-weight: bold;
  background: rgba(255, 255, 255);
  color: black;
}

.card__body h4 {
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: capitalize;
}

.card__footer {
  display: flex;
  padding: 1rem;
  padding-top: 0;
  margin-top: auto;
}
</style>
