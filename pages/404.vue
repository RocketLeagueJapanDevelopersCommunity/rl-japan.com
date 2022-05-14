<template>
  <div class="wrapper">
    <Header :header-cat="categories" />
    <div class="container">
      <dl>
        <dt class="status">404</dt>
        <dd class="message">ページが見つかりません</dd>
        <a class="button" href="https://rl-japan.com/">トップページへ戻る</a>
        <dd class="message-small">
          もしくは、<a
            class="report-link"
            target="_blank"
            :href="generateMessageLink"
            >運営に報告する</a
          >
        </dd>
      </dl>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ payload, $config }) {
    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    return {
      categories: categories.data.contents,
    };
  },
  computed: {
    generateMessageLink() {
      const template = encodeURI(`【404記事についてのお問い合わせ】
Page: ${this.$route.fullPath}
※このメッセージは編集せずそのまま送信してください。`);
      return `https://twitter.com/messages/compose?recipient_id=1219270339466690560&text=${template}`;
    },
  },
  head() {
    return {
      titleTemplate: null,
      title: 'ページが見つかりません | ロケットリーグ 日本コミュニティ',
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: -120px;
}
.status {
  font-family: 'Times New Roman', Times, serif;
  font-size: 120px;
  font-weight: bold;
  color: #999;
}
.message {
  color: #999;
  font-size: 20px;
}

.message-small {
  color: #999;
  font-size: 12px;
  margin-top: 8px;
}

.report-link {
  color: #3ba3e9;
}
.button {
  display: inline-block;
  border: none;
  border-radius: 5px;
  background: rgb(45, 45, 45);
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 24px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: linear-gradient(to right bottom, #8e6967, #541815);
  }
}
</style>
