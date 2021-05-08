<template>
  <div class="wrapper">
    <h2 class="pageTitle">ロケットリーグ Japan Communityのご紹介</h2>
    <ol class="lists">
      <li class="list">
        <p><strong>初心者に優しい！</strong></p>
      </li>
      <li class="list">
        <p>
          <strong>情報がたくさん得られる！</strong>
        </p>
      </li>
      <li class="list">
        <p><strong>友達が見つかる！</strong></p>
      </li>
    </ol>
    <div class="actions">
      <a
        class="link"
        target="site"
        :href="`/redirect?to=https%3A%2F%2Fdiscord.gg%2F5YwQNN9&utm_source=CTA&utm_medium=content-text&utm_campaign=blog-${id}-01`"
        >⇒ロケットリーグ Japan Communityでロケットリーグにもっとハマる。<img
          src="/images/icon_link.svg"
          alt=""
      /></a>

      <a
        target="site"
        :href="`/redirect?to=https%3A%2F%2Fdiscord.gg%2F5YwQNN9&utm_source=CTA&utm_medium=content-text&utm_campaign=blog-${id}-02`"
      >
        <button class="button">Discordで参加する</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
@media (min-width: 820px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 60px 0 40px;
    border-radius: 5px;
  }

  .lists {
    counter-reset: number;
  }

  .list {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &::before {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      counter-increment: number;
      content: counter(number);
      width: 32px;
      height: 32px;
      border-radius: 16px;
      background-color: #fbd9d8;
      color: #e9433b;
      font-weight: bold;
      margin-right: 10px;
    }

    p {
      flex: 1;
    }

    strong {
      font-weight: bold;
      background: linear-gradient(transparent 75%, #fbd9d8 75%);
    }
  }

  .actions {
    text-align: center;
    padding-top: 40px;
  }

  .link {
    display: inline-flex;
    align-items: center;
    color: var(--color-blue);
    font-weight: bold;
    margin-bottom: 20px;
    text-decoration: underline;

    img {
      margin-left: 10px;
    }
  }

  .button {
    border: none;
    border-radius: 5px;
    background: linear-gradient(to right bottom, #ecafac, #e9433b);
    color: #fff;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    padding: 16px 72px;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to right bottom, #8e6967, #541815);
    }
  }
}
@media (max-width: 820px) {
  .pageTitle {
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    padding: 6px 10px;
    margin: 40px 0 20px;
    border-radius: 5px;
  }

  .lists {
    counter-reset: number;
  }

  .list {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &::before {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      counter-increment: number;
      content: counter(number);
      width: 32px;
      height: 32px;
      border-radius: 16px;
      background-color: #fbd9d8;
      color: #e9433b;
      font-weight: bold;
      margin-right: 10px;
    }

    p {
      flex: 1;
    }

    strong {
      font-weight: bold;
      background: linear-gradient(transparent 75%, #fbd9d8 75%);
    }
  }

  .actions {
    text-align: center;
    padding-top: 40px;
  }

  .link {
    display: inline-flex;
    align-items: center;
    color: var(--color-blue);
    font-weight: bold;
    margin-bottom: 20px;
    text-decoration: underline;
    text-align: left;

    img {
      margin-left: 10px;
    }
  }

  .button {
    border: none;
    border-radius: 5px;
    background: var(--color-gradient-red);
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 16px 0;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background: linear-gradient(to right bottom, #8e6967, #541815);
    }
  }
}
</style>
