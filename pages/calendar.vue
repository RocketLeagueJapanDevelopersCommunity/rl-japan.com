<template>
  <div class="wrapper">
    <Header :header-cat="categories" />
    <div class="container">
      <h1>大会カレンダー</h1>
      <div v-if="cal_isloading === true" class="loader">
        <img
          class="loadingIcon"
          src="/images/icon_loading.svg"
          alt="検索中..."
        />
      </div>
      <div class="grid" :class="{ item_show: cal_isloading }">
        <FullCalendar :options="calendarOptions" />
        <a
          href="https://rl-japan.com/rljp-tournament-calender-open/"
          target="_blank"
        >
          <img
            class="banimg"
            src="@/static/images/calendar.png"
            width="100%"
            alt="大会カレンダー掲載募集"
        /></a>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

export default {
  components: {
    FullCalendar,
  },
  async asyncData({ params, payload, $config }) {
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
  data() {
    return {
      cal_isloading: true,
      calendarOptions: {
        locale: 'ja',
        plugins: [dayGridPlugin, interactionPlugin, googleCalendarPlugin],
        initialView: 'dayGridMonth',
        loading: (isLoading) => this.loadingAnim(isLoading),
        eventSources: [
          {
            googleCalendarApiKey: this.$config.gcalApiKey,
            googleCalendarId: this.$config.gcalId,
          },
        ],
        displayEventTime: false,
      },
    };
  },
  methods: {
    loadingAnim(isLoading) {
      console.log(isLoading);
      this.cal_isloading = isLoading;
    },
  },
  head() {
    return {
      title: 'カレンダー',
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
  margin: 40px 0 20px;
  padding: 10px 20px;
  border-radius: 5px;
}
.loader {
  color: #ccc;
  font-size: 20px;
  text-align: center;
  padding: 150px;
}
.item_show {
  opacity: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.status {
  font-family: 'Times New Roman', Times, serif;
  font-size: 120px;
  font-weight: bold;
  color: #999;
}
.list {
  background-color: #eee;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0;
}
.grid {
  width: 100%;
  margin: 16px;
  transition: all 0.3s ease-in;
}
.grid > a > .banimg {
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
}
.fc {
  padding: 16px;
  background: white;
}
@media screen and (min-width: 480px) {
  /* for iPhone Landscape (iPhone 横) */
  .fc {
    padding: 16px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* for iPad  */
  .fc {
    padding: 32px 6rem;
  }
}
@media screen and (min-width: 1024px) {
  /* for PC */
  .fc {
    padding: 48px 12rem;
  }
}
</style>
