<template>
  <div>
    <q-dialog v-model="visible" :backdrop-filter="'blur(4px)'" persistent>
      <q-card class="q-dialog-plugin" style="width: 700px">
        <q-card-section>
          <q-input v-model="newEmployee.name" label="Name" />
          <q-input
            filled
            v-model="newEmployee.dob"
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
                  <q-date v-model="newEmployee.dob">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input v-model="newEmployee.address" label="Address" />
          <q-select
            v-model="newEmployee.city"
            label="City"
            :options="tamilnaduDistricts"
          />
          <q-input
            v-model="newEmployee.state"
            label="State"
            readonly
            value="Tamil Nadu"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            label="Add Experience"
            color="secondary"
            class="q-ma-md"
            @click="addExperience = true"
          />
          <q-btn label="Submit" color="primary" @click="saveOrUpdate" />
          <q-btn label="Cancel" color="negative" @click="visible = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <add-experience v-model="addExperience" @save="addExperienceVal" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AddExperience from "./AddExperience.vue";

const emit = defineEmits(["save"]);
const props = defineProps({
  employeeDetails: Object,
});

const visible = defineModel();

const tamilnaduDistricts = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Tiruppur",
  "Vellore",
  "Thanjavur",
];

const addExperience = ref(false);
const newEmployee = ref({
  name: "",
  dob: "",
  address: "",
  state: "Tamil Nadu",
  experience: "",
});
const validateDate = (value) => {
  if (!value) {
    return "Date of birth is required";
  }

  const selectedDate = new Date(value);
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    return "Date of birth cannot be in the future";
  }

  return true;
};

const cancelAddEmployee = () => {
  newEmployee.value = {
    name: "",
    dob: "",
    address: "",
    state: "Tamil Nadu",
    experience: "",
  };
  visible.value = false;
};
const addExperienceVal = (val) => {
  newEmployee.value.experience = { ...val };
  addExperience.value = false;
};
const saveOrUpdate = () => {
  if (props.employeeDetails) {
    emit("update", newEmployee.value);
  } else {
    emit("save", newEmployee.value);
  }
  newEmployee.value = {
    name: "",
    dob: "",
    address: "",
    state: "Tamil Nadu",
    experience: "",
  };
  visible.value = false;
};

//
watch(
  () => props.employeeDetails,
  (newValue) => {
    if (newValue) {
      // Assign the new value to the reactive property
      Object.assign(newEmployee.value, newValue);
    }
  }
);
</script>
