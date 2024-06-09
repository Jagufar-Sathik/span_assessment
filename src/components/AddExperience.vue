<template>
  <q-dialog v-model="visible" persistent content-class="my-dialog-content">
    <q-card style="max-width: 800px">
      <q-card-section>
        <q-input v-model="form.companyName" label="Company Name" />
        <q-input
          filled
          v-model="form.fromDate"
          label="YYYY/MM/DD"
          :rules="['validateDate']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.fromDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          filled
          v-model="form.toDate"
          label="YYYY/MM/DD"
          :rules="['validateDate']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.toDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-radio
          v-model="form.position"
          v-for="(option, index) in positionOptions"
          :key="index"
          :label="option"
          :val="option"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="negative" @click="visible = false" />
        <q-btn label="Save" color="primary" @click="saveExperience" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineEmits, defineModel } from "vue";

const emits = defineEmits(["save"]);

const visible = defineModel();
const form = ref({
  companyName: "",
  fromDate: "",
  toDate: "",
  position: "",
});

const positionOptions = ["Developer", "Business Analyst", "Quality Analyst"];

const resetForm = () => {
  companyName.value = "";
  fromDate.value = "";
  toDate.value = "";
  position.value = "";
};

const saveExperience = () => {
  emits("save", form.value);
  resetForm();
  visible.value = false;
};
</script>

<style scoped>
.my-dialog-content {
  max-width: 800px;
}
</style>
