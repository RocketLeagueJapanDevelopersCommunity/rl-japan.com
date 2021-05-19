<template>
  <div>
    <FullCalendar :options="calendarOptions" />
    <modal name="modal-content" class="modal" :height="600" :scrollable="true">
      <div class="modal-header">
        <div class="modal-header-title">{{ modal.title }}</div>
        <div class="modal-header-info">
          <span>【日時】{{ modal.start_dt }}</span>
          <span>【主催】{{ modal.who }}</span>
        </div>
      </div>
      <div class="modal-body">
        <div class="notes" v-html="modal.notes"></div>
      </div>
    </modal>
  </div>
</template>

<script>
import dayjs from 'dayjs';
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
        displayEventTime: false,
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
      modal: {
        title: null,
        who: null,
        start_dt: null,
        notes: null,
      },
    };
  },
  methods: {
    handleEventClick(info) {
      const event = this.events.find((e) => e.id === info.event.id);
      if (event) {
        this.modal.title = event.title;
        this.modal.who = event.who;
        this.modal.start_dt = dayjs(event.start_dt).format('YYYY/MM/DD HH:mm');
        this.modal.notes = event.notes;
        this.$modal.show('modal-content');
      }
    },
    hide() {
      this.$modal.hide('modal-content');
    },
  },
};
</script>

<style>
.fc-event-main:hover {
  cursor: pointer;
  backdrop-filter: brightness(60%);
}

.modal-body .notes a {
  color: -webkit-link;
  text-decoration: underline;
}
</style>

<style scoped>
.modal {
  text-align: left;
  background: rgba(245, 245, 247, 0.6);
  color: #1d1d1f;
}
.modal-header {
  padding: 10px 10px 5px 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  background: #2c3e50;
  color: #fff;
}
.modal-header-title {
  font-size: 24px;
}
.modal-header-info {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 12px;
}
.modal-body {
  padding: 5px 0 5px 10px;
  max-height: calc(600px - 85px);
  overflow-y: auto;
}
.modal-body .notes {
  font-size: 14px;
}
</style>
