import axios from 'axios';
require('dotenv').config();
const {
  API_KEY,
  SERVICE_ID,
  GA_ID,
  CA_PUB,
  GCAL_API_KEY,
  GCAL_ID,
} = process.env;

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
    serviceId: process.env.NODE_ENV !== 'production' ? SERVICE_ID : undefined,
    gcalApiKey: GCAL_API_KEY,
    gcalId: GCAL_ID,
  },
  privateRuntimeConfig: {
    apiKey: API_KEY,
    serviceId: SERVICE_ID,
    gcalApiKey: GCAL_API_KEY,
    gcalId: GCAL_ID,
  },
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    titleTemplate: '%s | ロケットリーグ 日本コミュニティ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'ロケットリーグ 日本コミュニティ',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://rl-japan.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ロケットリーグ 日本コミュニティ',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://rl-japan.com/images/ogp.png',
      },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@RL_Japan' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://rl-japan.com/favicon.png',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://rl-japan.com/feed.xml',
        title: 'Atom',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js',
        async: true,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e9433b' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/reset.css',
    '@/assets/styles/colors.css',
    {
      src: '~/node_modules/highlight.js/styles/hybrid.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-scrollto',
    '~/plugins/jsonld',
    { src: '~/plugins/vue-modal', ssr: false },
  ],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/dayjs'],
    [
      '@nuxtjs/google-gtag',
      {
        id: GA_ID,
      },
    ],
    [
      '@nuxtjs/google-adsense',
      {
        id: CA_PUB,
        pageLevelAds: true,
        analyticsUacct: GA_ID,
        analiticsDomainName: 'rl-japan.com',
      },
    ],
    ['@nuxtjs/sitemap'],
    '@nuxtjs/feed',
    '@nuxtjs/proxy',
  ],
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  proxy: ['http://localhost:9000/.netlify'],
  pwa: {
    workbox: {
      offlineAssets: [
        '/images/icon_author.svg',
        '/images/icon_clock.svg',
        '/images/icon_facebook.svg',
        '/images/icon_feed.svg',
        '/images/icon_hatena.svg',
        '/images/icon_menu.svg',
        '/images/icon_quote.svg',
        '/images/icon_search.svg',
        '/images/icon_twitter.svg',
        '/images/icon_link.svg',
        '/images/logo.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          preserve: false,
          importFrom: ['assets/styles/colors.css'],
        },
        'postcss-nested': {},
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'pages',
      });
      routes.push({
        path: '/category/:categoryId/page/:id',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'categories',
      });
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    interval: 100,
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/popular-articles`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.articles;
        });
      const banner = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/banner`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data;
        });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?offset=${offset}&limit=${limit}&depth=2`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then(async (res) => {
            let articles = [];
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.id}`,
                payload: { content, popularArticles, banner },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/',
        payload: { popularArticles, banner },
      };

      // 一覧のページング
      const pages = await axios
        .get(
          `https://${SERVICE_ID}.microcms.io/api/v1/blog?limit=1&fields=id`,
          {
            headers: { 'X-API-KEY': API_KEY },
          }
        )
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
            route: `/page/${p}`,
            payload: { popularArticles, banner },
          }))
        );

      // 検索ページ
      const search = {
        route: '/search',
        payload: { popularArticles, banner },
      };

      const categories = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios
            .get(
              `https://${SERVICE_ID}.microcms.io/api/v1/blog?limit=1&fields=id&filters=category[equals]${category}`,
              {
                headers: {
                  'X-API-KEY': API_KEY,
                },
              }
            )
            .then((res) => {
              return range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: `/category/${category}/page/${p}`,
                payload: { popularArticles, banner },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);
      return [index, search, ...articles, ...pages, ...flattenCategoryPages];
    },
    dir: 'dist',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://rl-japan.com',
    exclude: ['/draft', '/404'],
    gzip: true,
    trailingSlash: true,
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(`https://${SERVICE_ID}.microcms.io/api/v1/blog`, {
            headers: { 'X-API-KEY': API_KEY },
          })
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_update.xml',
      async create(feed) {
        feed.options = {
          title: '更新情報｜ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]update`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_tournament.xml',
      async create(feed) {
        feed.options = {
          title: '大会情報｜ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]tournament`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_tips.xml',
      async create(feed) {
        feed.options = {
          title: '攻略情報｜ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]tips`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_rlcs.xml',
      async create(feed) {
        feed.options = {
          title: 'RLCS｜ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]rlcs`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_interview.xml',
      async create(feed) {
        feed.options = {
          title: 'インタビュー｜ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]interview`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
    {
      path: '/feed_worldtopics.xml',
      async create(feed) {
        feed.options = {
          title: '海外の話題｜ロケットリーグ 日本コミュニティ',
          link: 'https://rl-japan.com/feed.xml',
          description:
            '大会情報、オフラインイベントなどや、アップデート、初心者向けTipsなどなどロケットリーグについての様々な情報を発信していくコミュニティWebサイトです。',
        };

        const posts = await axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/blog?filters=category[equals]world-topics`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://rl-japan.com/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
};
