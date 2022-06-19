<template>
  <div>
    <header class="header">
      <div class="logo">
        <a href="/">
          <img
            class="iconImg"
            src="/images/icon.svg"
            width="100"
            height="100"
            alt="rl-japan icon"
          />
          <img
            class="logoImg"
            src="/images/logo.svg"
            width="148"
            height="28"
            alt="rl-japan logo"
          />
        </a>
      </div>

      <button class="menuBtn" @click="toggleOpen()">
        <img src="/images/icon_menu.svg" alt="menu" />
      </button>
      <div v-if="open" class="mask" @click="setOpen(false)"></div>

      <div class="menu" :class="{ isOpen: open }">
        <p class="lists_title sp">メニュー</p>
        <ul class="lists">
          <li class="list">
            <nuxt-link :to="`/calendar`" class="link">大会カレンダー</nuxt-link>
          </li>
          <ul class="sns_lists">
            <li
              v-for="sns_list in sns_lists"
              :key="sns_list.name"
              class="sns_list"
            >
              <a :href="sns_list.url">
                <img :src="sns_list.image" />
              </a>
            </li>
          </ul>
        </ul>
        <Category class="sp_category sp" :categories="headerCat" />
        <Footer class="sp_footer sp" />
      </div>
    </header>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  props: {
    headerCat: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      params: this.params || '',
      open: false,
      sns_lists: [
        {
          name: 'Twitter',
          url: 'https://twitter.com/RL_Japan',
          image: require('@/static/social_icons/twitter.png'),
        },
        {
          name: 'Discord',
          url: 'https://discord.gg/5YwQNN9',
          image: require('@/static/social_icons/discord.png'),
        },
        {
          name: 'YouTube',
          url: 'https://www.youtube.com/channel/UCsgfWCiq0fKODDH-psqNsGw',
          image: require('@/static/social_icons/youtube.png'),
        },
        {
          name: 'Twitch',
          url: 'https://www.twitch.tv/rljapan',
          image: require('@/static/social_icons/twitch.png'),
        },
      ],
    };
  },
  mounted() {
    this.params = location.search || '';
  },
  methods: {
    setOpen(value) {
      this.open = value;
    },
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
@media (min-width: 800px) {
  .sp {
    display: none;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    padding-left: 8rem;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
    background-color: #fff;
  }

  .empty {
    height: 80px;
    margin-bottom: 40px;
  }

  .logo {
    margin-right: 30px;
    a {
      display: block;
      height: 28px;
    }
  }

  .logoImg {
    height: 28px;
  }
  .iconImg {
    position: absolute;
    top: 8px;
    left: 8px;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
    background-color: #fff;
    width: 88px;
    height: 88px;
  }
  .sns_lists {
    display: flex;
    justify-content: flex-start;
    padding: auto;
    margin-left: 4px;
    .sns_list {
      padding: 0 16px;
      white-space: nowrap;
      padding-left: 4px;
      :hover {
        background-color: #eee;
      }
      a {
        img {
          height: 20px;
        }
      }
    }
  }
  .menuBtn {
    display: none;
  }

  .menu {
    display: flex;
    padding: 12px 0;
  }

  .lists {
    display: flex;
    align-items: center;
  }

  .list {
    margin-right: 30px;
    white-space: nowrap;
    padding: 8px 24px;
    &:hover {
      border-radius: 5px;
      background-color: var(--color-main-bg-red);
      text-align: center;
    }
    &.noMargin {
      margin: 0;
    }

    a,
    a:visited {
      color: var(--color-text-main);
    }
  }
}

@media (max-width: 800px) {
  .lists_title {
    position: relative;
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: #2b2c30;
    border: 1px;
    margin: 18px;
    padding-left: 16px;
    border-left: 2px solid var(--color-main-red);
  }
  .sp_footer {
    position: fixed !important;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 16px;
    z-index: 10;
    border-bottom: 1px solid var(--color-border);
  }

  .empty {
    height: 61px;
  }

  .logo {
    display: inline-block;
    height: 28px;
  }

  .logoImg {
    height: 28px;
  }
  .iconImg {
    display: none;
  }

  .menuBtn {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .sns_lists {
    display: none;
  }
  .menu {
    position: absolute;
    left: 0;
    top: 61px;
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    border-bottom: 1px solid #eee;
    z-index: 2001;
    padding-top: 8px;

    &.isOpen {
      display: flex;
    }
  }

  .lists {
    padding: 8px 0;

    &:first-child {
      padding-top: 0;
    }
  }

  .list {
    padding: 0 16px;
    white-space: nowrap;

    a {
      display: block;
      color: var(--color-text-main);
      padding: 8px 0;
      border-bottom: 2px solid var(--color-border-light);
    }

    &:last-child a {
      border-bottom: none;
    }
  }

  .mask {
    position: fixed;
    top: 61px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #fff;
    z-index: 2000;
  }
}
</style>
