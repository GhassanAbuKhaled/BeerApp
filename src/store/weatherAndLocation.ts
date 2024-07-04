import { defineStore } from "pinia";

interface WeatherAndLocationData {
  country: string;
  city: string;
  temperature: number;
}

export const weatherAndLocationStore = defineStore({
  id: "WeatherAndLocation",
  state: (): WeatherAndLocationData => ({
    country: "",
    city: "",
    temperature: 0,
  }),

  getters: {
    getData: (state): WeatherAndLocationData | null => ({
      city: state.city,
      country: state.country,
      temperature: state.temperature,
    }),
  },

  actions: {
    setData(newData: Partial<WeatherAndLocationData>) {
      Object.assign(this, newData);
      console.log(newData);
    },
  },
});
