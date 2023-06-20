<template>
  <div class="wrapper">
    <Header :header-cat="categories" />
    <div class="divider">
      <div class="container">
        <input
          v-model="searchQuery"
          class="search"
          type="text"
          placeholder="キーワードを入力"
          @keyup.enter="(e) => onEnterSearch(e.target.value)"
          @keypress="setSearchable"
        />
        <div v-if="loading" class="loader">
          <img
            class="loadingIcon"
            src="/images/icon_loading.svg"
            alt="検索中..."
          />
        </div>
        <div v-else>
          <div v-show="contents.length === 0" class="loader">
            記事がありません
          </div>
          <div v-if="contents.length > 0" style="text-align: right">
            {{ totalCount }}件見つかりました。
          </div>
          <PostLists :contents="contents" />
          <button
            @click="loadMoreArticle"
            v-show="contents.length > 0 && currentOffset < totalCount"
          >
            <span v-if="!loadingMore">もっと見る</span>
            <img
              v-else
              height="25px"
              src="/images/icon_loading.svg"
              alt="検索中..."
            />
          </button>
          <div v-if="currentOffset > totalCount" style="text-align: center">
            全{{ totalCount }}件
          </div>
        </div>
      </div>
      <aside class="aside">
        <Banner id="search" :banner="banner" />
        <Categories :categories="categories" />
        <PopularArticles :contents="popularArticles" />
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData({ payload, $config }) {
    const popularArticles =
      payload !== undefined && payload.popularArticles !== undefined
        ? payload.popularArticles
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/popular-articles`,
              {
                headers: { 'X-API-KEY': $config.apiKey }
              }
            )
          ).data.articles
    const banner =
      payload !== undefined
        ? payload.banner
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/banner`,
              {
                headers: { 'X-API-KEY': $config.apiKey }
              }
            )
          ).data
    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey }
      }
    )
    return {
      popularArticles,
      banner,
      categories: categories.data.contents
    }
  },
  data() {
    return {
      searchable: true,
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      categories: this.categories || [],
      loading: true,
      searchQuery: this.$route.query.q || '',
      loadingMore: false,
      currentOffset: 0
    }
  },
  head() {
    return {
      titleTemplate: null,
      title: 'ロケットリーグ 日本コミュニティ'
    }
  },
  mounted() {
    this.onEnterSearch(this.searchQuery)
  },
  methods: {
    setSearchable() {
      this.searchable = true
    },
    async onEnterSearch(q = '') {
      this.contents = []
      this.totalCount = 0
      if (!q.trim() || !this.searchable) {
        return
      }

      this.loading = true
      await axios.get(`https://search.rl-japan.com/?q=${q}`).then((data) => {
        const responseContents = data.data
        this.contents.push(...responseContents.contents)
        this.totalCount = responseContents.totalCount
        this.searchable = false

        this.loading = false
      })

      this.searchQuery = q
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, q }
      })
    },
    async loadMoreArticle() {
      if (this.totalCount > this.currentOffset) {
        this.loadingMore = true
        const offset = this.currentOffset + 10

        await axios
          .get(
            `https://search.rl-japan.com/?q=${this.searchQuery}&offset=${offset}`
          )
          .then((data) => {
            const responseContents = data.data
            this.contents.push(...responseContents.contents)
            this.totalCount = responseContents.totalCount
            this.searchable = false
            this.currentOffset = offset
          })

        this.loadingMore = false
      }
    }
  }
}
</script>

<style scoped>
button {
  border: none;
  border-radius: 5px;
  background: var(--color-text-sub);
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: var(--color-text-main);
  }
}
.search {
  border: 1px solid var(--color-border);
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  background: url('/images/icon_search.svg') no-repeat 10px center, #eee;
  color: var(--color-text-sub);
  padding-left: 40px;
  margin-bottom: 20px;
  box-shadow: none;
  -webkit-appearance: none;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) inset;
  }

  &:focus {
    outline: none;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) inset;
  }
}

.loadingIcon {
  width: 38px;
  height: 38px;
}

@media (min-width: 1160px) {
  .loader {
    color: #ccc;
    font-size: 20px;
    text-align: center;
    padding: 150px;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }

  .divider {
    display: flex;
    justify-content: space-between;
    width: 1160px;
    margin: 20px auto 0;
  }

  .container {
    width: 820px;
  }

  .aside {
    width: 300px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }
}
@media (min-width: 820px) and (max-width: 1160px) {
  .loader {
    color: #ccc;
    text-align: center;
    font-size: 16px;
    padding-top: 20px;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }

  .divider {
    margin: 20px auto 0;
    width: 740px;
  }

  .article {
    width: 740px;
  }

  .aside {
    margin-top: 60px;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }
}
@media (max-width: 820px) {
  .loader {
    color: #ccc;
    text-align: center;
    font-size: 16px;
    padding-top: 20px;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 32px;
    height: 32px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 6px;

    &.active {
      background-color: #3067af;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #3067af;
    }
  }

  .divider {
    margin: 20px 0 0;
    padding: 0 20px;
  }

  .article {
    width: 100%;
  }

  .aside {
    margin-top: 60px;
    width: 100%;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 250px;
    background-color: #2b2c30;
    color: #fff;
    border-radius: 5px;

    img {
      width: 160px;
      margin-top: 10px;
    }

    p {
      margin-top: 30px;
      color: #999;
      padding-top: 10px;
      font-size: 14px;
      width: 260px;
      text-align: center;
      border-top: 1px solid #666;
    }

    span {
      display: block;
      border: 1px solid #fff;
      width: 120px;
      margin: 0 auto;
      text-align: center;
      margin-top: 10px;
      padding: 4px 0;
      font-size: 14px;
    }
  }

  .pageTitle {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
