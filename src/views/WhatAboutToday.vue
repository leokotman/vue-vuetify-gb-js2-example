<template>
  <v-sheet height="100%" class="d-flex justify-center align-center">
    <div class="d-flex flex-column">
      <h2 class="mb-4">А сегодня праздник?</h2>

      <v-fab-transition appear>
        <v-btn
          v-if="!isLoaded"
          color="pink"
          :loading="isLoading"
          outlined
          @click="checkIsTodayHoliday"
        >
          Узнать
        </v-btn>
        <p v-else>
          Сегодня
          <span class="font-weight-bold pink--text">{{ today }}</span>
        </p>
      </v-fab-transition>
    </div>
  </v-sheet>
</template>

<script>
import { HolidaysService } from "@/services/HolidaysService.js";

const service = new HolidaysService();

export default {
  data: () => ({
    isLoading: false,
    isLoaded: false,
    isTodayHoliday: null,
  }),

  computed: {
    today() {
      return this.isTodayHoliday
        ? "Выходной! Ура!"
        : "Рабочий день! Идите работать!";
    },
  },

  methods: {
    async checkIsTodayHoliday() {
      this.isLoading = true;
      this.isTodayHoliday = await service.isTodayHoliday();
      this.isLoading = false;
      this.isLoaded = true;
    },
  },
};
</script>
