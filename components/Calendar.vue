<template>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import localeJa from '@fullcalendar/core/locales/ja';
import { getColor } from '../libs/calendar';

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
    subcalendars: {
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
        contentHeight: 'auto',
        dayCellContent: (e) => {
          e.dayNumberText = e.dayNumberText.replace('日', '');
        },
        eventClick: this.handleEventClick,
        events: this.events.map((event) => {
          let color = '';
          const subs = this.subcalendars.filter((sub) =>
            event.subcalendar_ids.includes(sub.id)
          );
          if (subs.length > 0) {
            color = getColor(subs[0].color);
          }
          return {
            id: event.id,
            title: event.title,
            date: event.start_dt,
            display: 'block',
            backgroundColor: color,
            borderColor: '#ffffff',
          };
        }),
      },
    };
  },
  methods: {
    handleEventClick(info) {
      const event = this.events.find((e) => e.id === info.event.id);
      if (event) {
        alert(`
          大会名: ${event.title}\n
          主催: ${event.who}\n
          日時: ${event.start_dt}\n
          詳細: \n${event.notes}
        `);
      }
    },
  },
};
</script>

<style>
.fc-event-main:hover {
  cursor: pointer;
  backdrop-filter: brightness(60%);
}
</style>
