import { defineStore } from "pinia";
import { Notify } from "quasar";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: "",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async updateEmployee(id) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/employees/${id}`
        );
        Notify.create({
          type: "info",
          message: `${response.data}`,
          timeout: 2000,
          position: "top",
          actions: [{ label: "Close", color: "white", handler: () => {} }],
        });
      } catch (error) {
        Notify.create({
          type: "negative",
          message: `${error.response.data}`,
          timeout: 2000,
          position: "top",
          actions: [{ label: "Close", color: "white", handler: () => {} }],
        });
        throw error;
      }
    },
    async deleteEmployee(id) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/employees/${id}`
        );
        Notify.create({
          type: "info", // Notification type: 'positive', 'negative', 'warning', 'info'
          message: `${response.data}`,
          timeout: 2000,
          position: "top",
          actions: [{ label: "Close", color: "white", handler: () => {} }],
        });
      } catch (error) {
        Notify.create({
          type: "negative", // Notification type: 'positive', 'negative', 'warning', 'info'
          message: `${error.response.data}`,
          timeout: 2000,
          position: "top",
          actions: [{ label: "Close", color: "white", handler: () => {} }],
        });
        throw error;
      }
    },
    async get(apiName, params) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/${apiName}`,
          { params }
        );
        return response.data;
      } catch (error) {
        Notify.create({
          type: "negative",
          message: `${error.response.data}`,
          timeout: 2000,
          position: "top",
          actions: [{ label: "X", color: "white", handler: () => {} }],
        });
        throw error;
      }
    },
    async post(apiName, payload) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/${apiName}`,
          payload
        );
        return response.data;
      } catch (error) {
        Notify.create({
          type: "negative",
          message: `${error.response.data.error}`,
          timeout: 2000,
          position: "top",
          actions: [{ label: "Close", color: "white", handler: () => {} }],
        });
      }
    },
  },
});
