<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import localeJa from '@fullcalendar/core/locales/ja';

export default {
  components: {
    FullCalendar,
  },
  props: {
    events: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        locale: localeJa,
        events: this.events.map((event) => {
          return {
            title: event.title,
            date: event.start_dt,
          };
        }),
      },
    };
  },
};
</script>
