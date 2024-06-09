<template>
  <q-dialog v-model="showDialog" :backdrop-filter="'blur(4px)'" persistent>
    <q-card class="q-px-xl">
      <q-card-section>
        <p>Are you sure to {{ props.action }}?</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="showDialog = false" />
        <q-btn color="secondary" @click="submitAction">{{
          props.action
        }}</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  action: String,
});
const showDialog = defineModel();
const emit = defineEmits(["action"]);

const submitAction = () => {
  emit("action", props.action);
  showDialog.value = false;
};
</script>
