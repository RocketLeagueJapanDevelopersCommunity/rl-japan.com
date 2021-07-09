<template>
  <footer class="footer">
    <ul class="lists">
      <li v-for="sns_list in sns_lists" :key="sns_list.name" class="list">
        <a :href="sns_list.url">{{ sns_list.name }}</a>
      </li>
    </ul>
    <p class="cr">© ロケットリーグ 日本コミュニティ</p>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      sns_lists: [
        {
          name: 'Twitter',
          url: 'https://twitter.com/RL_Japan',
        },
        {
          name: 'Discord',
          url: 'https://discord.gg/5YwQNN9',
        },
        {
          name: 'YouTube',
          url: 'https://www.youtube.com/channel/UCsgfWCiq0fKODDH-psqNsGw',
        },
        {
          name: 'Twitch',
          url: 'https://www.twitch.tv/rljapan',
        },
        {
          name: 'Developed by RLJDC',
          url: 'https://rljp.dev/',
        },
      ],
    };
  },
};
</script>
<style scoped>
@media (min-width: 600px) {
  .footer {
    position: relative;
    padding: 30px 40px 20px;
    z-index: 10;
    color: #2b2c30;
    background-color: #fff;
    margin-top: 120px;
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  }

  .list {
    font-size: 14px;
    white-space: nowrap;

    &::after {
      content: '|';
      margin: 0 20px;
    }

    &:last-child::after {
      content: '';
      margin: 0;
    }

    a {
      color: #2b2c30;
    }
  }

  .cr {
    margin-top: 20px;
    text-align: center;
    color: #616269;
    font-size: 14px;
  }
}
@media (max-width: 600px) {
  .footer {
    position: relative;
    padding: 30px 20px;
    z-index: 10;
    color: #2b2c30;
    background-color: #fff;
    margin-top: 20px;
  }

  .cr {
    font-size: 12px;
    margin-top: 10px;
    color: #616269;
  }

  .lists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .list {
    font-size: 12px;
    white-space: nowrap;

    &::after {
      content: '|';
      margin: 0 10px;
    }

    &:last-child::after {
      content: '';
      margin: 0;
    }

    a {
      color: #2b2c30;
    }
  }
}
</style>
