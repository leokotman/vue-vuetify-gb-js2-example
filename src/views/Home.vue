<template>
  <v-sheet height="100%" class="fill-height d-flex justify-center align-center">
    <v-sheet
      v-if="isLoading"
      height="100vh"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular indeterminate :size="50" color="black" />
    </v-sheet>
    <v-sheet color="transparent" v-else width="80%" class="elevation-2">
      <div class="d-flex align-center justify-space-between">
        <h1 class="mb-6">{{ holidays[carousel].holidayName }}</h1>
        <v-btn color="pink" dark @click="$router.push('/today')">
          Проверить сегодня
        </v-btn>
      </div>
      <v-carousel v-model="carousel" hide-delimiters :height="600">
        <v-carousel-item
          v-for="(item, i) in holidays"
          :key="i"
          :src="require(`@/assets/${item.src}`)"
        ></v-carousel-item>
      </v-carousel>
    </v-sheet>
  </v-sheet>
</template>

<script>
import { HolidaysService } from "@/services/HolidaysService.js";

const service = new HolidaysService();

export default {
  name: "Home",

  data: () => ({
    carousel: 0,

    holidays: [],

    items: [
      {
        src: "4_november.png",
      },
      {
        src: "christmas-illustrations.png.pagespeed.ce.ZHWR75oGQP.png",
      },
      {
        src:
          "defender-fatherland-day-banner-russian-national-holiday-february-translation-inscriptions-th-february-86393094.jpg",
      },
      {
        src: "drawing-russia-day_23-2148552389.jpg",
      },
      {
        src: "flat-russian-victory-day-illustration_23-2148896721.jpg",
      },
      {
        src: "friends-celebrating-new-year-illustration_74855-2400.jpg",
      },
      {
        src: "happy-labor-day-illustration_9850-942.jpg",
      },
      {
        src:
          "international-women-s-day-illustration-with-profile-woman_52683-55776.jpg",
      },
    ],

    isLoading: true,
  }),

  beforeMount() {
    service.allHolidaysByCountry().then((data) => {
      this.isLoading = false;

      const settings = {
        "New Year's Day":
          "friends-celebrating-new-year-illustration_74855-2400.jpg",
        "Unity Day": "4_november.png",
      };

      this.holidays = data
        .filter(({ name }) => name in settings)
        .map(({ name, localName }) => {
          return {
            src: settings[name],
            holidayName: localName,
          };
        });
    });
  },
};
</script>
