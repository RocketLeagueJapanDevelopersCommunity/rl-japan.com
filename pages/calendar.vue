<template>
  <div class="wrapper">
    <Header :header-cat="categories" />
    <div class="container">
      <h1>大会カレンダー</h1>
      <div class="grid">
        <FullCalendar :options="calendarOptions" />
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
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, googleCalendarPlugin],
        initialView: 'dayGridMonth',
        eventSources: [
          {
            googleCalendarApiKey: this.$config.gcalApiKey,
            googleCalendarId: this.$config.gcalId,
          },
        ],
      },
    };
  },
  computed: {},
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
  margin-bottom: -120px;
  margin: 16px;
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
}
@media screen and (min-width: 480px) {
  /* for iPhone Landscape (iPhone 横) */
  .fc {
    padding: 0;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* for iPad  */
  .fc {
    padding: 0 6rem;
  }
}
@media screen and (min-width: 1024px) {
  /* for PC */
  .fc {
    padding: 0 12rem;
  }
}
</style>
