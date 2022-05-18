<template>
  <div class="wrapper">
    <Header :header-cat="categories" />
    <div class="divider">
      <div class="container">
        <div v-if="selectedCategory">
          <h1 :class="`selectedCategory ${selectedCategory.id}`">
            {{ selectedCategory.name }}
          </h1>
        </div>
        <div v-else>
          <h1 class="selectedCategory">ピックアップ記事</h1>
          <Slider :slider-contents="popularArticles" />
          <h1 class="selectedCategory">新着記事</h1>
        </div>
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <PostLists :contents="contents" />
        <ul v-show="contents.length > 0" class="pager">
          <li
            v-for="p in pager"
            :key="p"
            class="page"
            :class="{ active: page === `${p + 1}` }"
          >
            <nuxt-link
              :to="`/${
                selectedCategory !== undefined
                  ? `category/${selectedCategory.id}/`
                  : ''
              }page/${p + 1}`"
            >
              {{ p + 1 }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <aside class="aside">
        <Banner id="aside-banner" :banner="banner" />
        <Search />
        <Category :categories="categories" />
        <template id="aside-adsbygoogle">
          <adsbygoogle
            :ad-style="{ display: 'block' }"
            :ad-client="`ca-pub-1687602031519351`"
            :ad-slot="`8949075408`"
            :ad-format="'auto'"
            :full-width-responsive="true"
          />
        </template>
      </aside>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Slider from '@/components/Slider';

export default {
  components: {
    Slider,
  },
  async asyncData({ params, payload, $config }) {
    const page = params.id || '1';
    const categoryId = params.categoryId;
    const limit = 10;
    const popularArticles =
      payload !== undefined && payload.popularArticles !== undefined
        ? payload.popularArticles
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/popular-articles`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data.articles;
    const banner =
      payload !== undefined
        ? payload.banner
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/banner`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data;
    const { data } = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/blog?limit=${limit}${
        categoryId === undefined ? '' : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const selectedCategory =
      categoryId !== undefined
        ? categories.data.contents.find((content) => content.id === categoryId)
        : undefined;
    return {
      ...data,
      categories: categories.data.contents,
      selectedCategory,
      popularArticles,
      banner,
      page,
      pager: [...Array(Math.ceil(data.totalCount / limit)).keys()],
    };
  },
  data() {
    return {
      contents: this.contents || [],
      totalCount: this.totalCount || 0,
      pager: this.pager || [],
    };
  },
  head() {
    return {
      titleTemplate: null,
      title: 'ロケットリーグ 日本コミュニティ',
    };
  },
};
</script>

<style scoped>
h1.selectedCategory {
  position: relative;
  display: block;
  font-weight: bold;
  padding-left: 24px;
  font-size: 24px;
  color: #2b2c30;
  border: 1px;
  margin: 24px;
  margin-left: 0;
}

h1.selectedCategory::before {
  background-color: #e9433b;
  position: absolute;
  top: 50%;
  left: 0;
  width: 15px;
  height: 15px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  border-radius: 50%;
  content: '';
}
/* categories */

h1.selectedCategory.tips::before {
  background: var(--cat-tips);
}
h1.selectedCategory.tournament::before {
  background: var(--cat-tournament);
}
h1.selectedCategory.update::before {
  background: var(--cat-update);
}
h1.selectedCategory.information::before {
  background: var(--cat-information);
}
h1.selectedCategory.rlcs::before {
  background: var(--cat-rlcs);
}
h1.selectedCategory.interview::before {
  background: var(--cat-interview);
}
h1.selectedCategory.world-topics::before {
  background: var(--cat-world-topics);
}
h1.selectedCategory.offline-event::before {
  background: var(--cat-offline-event);
}

/* categories end */

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
    background-color: var(--color-main-bg-red);
    border-radius: 50%;
    font-weight: bolder;
    margin: 10px;
    background: white;

    &:hover {
      background: #fbfbfb;
      color: #4e4e4e;
    }

    &.active {
      background-color: var(--color-main-red);

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #2d2d2d;
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
    background-color: var(--color-main-bg-red);
    border-radius: 50%;
    font-weight: bolder;
    margin: 10px;
    background: white;

    &:hover {
      background: #fbfbfb;
      color: #4e4e4e;
    }

    &.active {
      background-color: var(--color-main-red);

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #2d2d2d;
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
    background-color: var(--color-main-bg-red);
    border-radius: 50%;
    font-weight: bolder;
    margin: 6px;
    background: white;

    &:hover {
      background: #fbfbfb;
      color: #4e4e4e;
    }

    &.active {
      background-color: var(--color-main-red);

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #2d2d2d;
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
