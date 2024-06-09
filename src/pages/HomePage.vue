<template>
  <div>
    <q-page>
      <div class="q-pa-md q-mb-xl">
        <q-btn
          label="Add Employee"
          class="q-px-xl q-py-sm disabled"
          style="display: block; margin: auto"
          color="secondary"
          @click="addEmployeeDialog = true"
        />
        <q-btn
          label="Search"
          color="dark"
          style="float: right"
          @click="showSearchDialog = true"
        />
      </div>
      <q-table
        :rows="filteredEmployees"
        :columns="columns"
        row-key="sno"
        :rows-per-page-options="[5, 10, 15]"
        virtual-scroll
        no-data-label="I didn't find anything for you"
      >
        <template #body-cell-experience="props">
          <!-- Access props.row.experience to get the experience object -->
          <q-td :props="props">
            <!-- Access props.row.experience.companyName, props.row.experience.fromDate, props.row.experience.toDate, props.row.experience.position -->
            <div v-if="props.row.experience">
              <p>{{ props.row.experience.companyName }}</p>
              <p>
                {{ props.row.experience.fromDate }} to
                {{ props.row.experience.toDate }}
              </p>
              <p>{{ props.row.experience.position }}</p>
            </div>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-icon
              name="delete"
              @click="openPromptDialog(props.row.sno, 'delete')"
              :size="'xs'"
              color="primary"
              class="q-mx-xs cursor-pointer"
            />
            <q-icon
              name="edit"
              @click="openPromptDialog(props.row, 'update')"
              :size="'xs'"
              color="primary"
              class="q-mx-xs cursor-pointer"
            />
          </q-td>
        </template>
      </q-table>
      <div>
        <q-dialog v-model="showSearchDialog">
          <q-card style="width: 400px">
            <q-card-section>
              <q-select
                v-model="searchCriteria"
                :options="searchOptions"
                label="Search Criteria"
              />
              <q-input
                v-model="searchQuery"
                label="Search Query"
                placeholder="Enter search query"
              />
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                label="Search"
                color="secondary"
                @click="showSearchDialog = false"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-page>
    <div>
      <add-employee-dialog
        v-model="addEmployeeDialog"
        :employeeDetails="updateEmployeeInfo"
        @save="saveEmployee"
        @update="updateEmployee"
      />
      <prompt-dialog
        v-model="openPrompt"
        :action="action"
        @action="updateOrDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "stores/userStore";
import PromptDialog from "src/components/PromptDialog.vue";
import AddEmployeeDialog from "src/components/AddEmployeeDialog.vue";

const userStore = useUserStore();

const employees = ref([]);
const openPrompt = ref(false);
let updateEmployeeInfo = "";
let sno = "";
let action = "";
const showSearchDialog = ref(false);
const searchCriteria = ref("Name");
const searchQuery = ref("");
const searchOptions = ["Name", "dob", "address", "city"];

const columns = [
  { name: "S.No", field: "sno", label: "S.no", align: "left" },
  { name: "name", field: "name", label: "Name", align: "left" },
  { name: "dob", field: "dob", label: "DOB", align: "left" },
  { name: "address", field: "address", label: "Address", align: "left" },
  { name: "city", field: "city", label: "City", align: "left" },
  { name: "state", field: "state", label: "State", align: "left" },
  {
    name: "experience",
    field: "experience",
    label: "Experience",
    align: "left",
  },
  { name: "actions", field: "actions", label: "Actions", align: "center" },
];

const addEmployeeDialog = ref(false);
const newEmployee = ref({ city: "", state: "Tamil Nadu" });

const filteredEmployees = computed(() => {
  // Filter employees based on search criteria and query
  if (searchQuery.value === "") {
    return employees.value; // If search query is empty, return all employees
  } else {
    return employees.value.filter((employee) => {
      // Perform case-insensitive search
      return employee[searchCriteria.value.toLowerCase()]
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    });
  }
});

const openPromptDialog = (val, act) => {
  action = act;
  if (act === "update") {
    updateEmployeeInfo = val;
  } else {
    sno = val;
  }
  openPrompt.value = true;
};
const updateOrDelete = (action) => {
  if (action === "update") {
    addEmployeeDialog.value = true;
  } else if (action === "delete") {
    deleteEmployee();
  }
};
const deleteEmployee = () => {
  userStore
    .deleteEmployee(sno)
    .then((response) => {
      // Remove the deleted employee from the frontend
      employees.value = employees.value.filter(
        (employee) => employee.sno !== sno
      );
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
    });
};

const updateEmployee = (updatedVal) => {
  userStore
    .updateEmployee(updatedVal.sno)
    .then((response) => {
      const index = employees.value.findIndex(
        (employee) => employee.sno === updatedVal.sno
      );
      if (index !== -1) {
        employees.value[index] = updatedVal;
      } else {
        console.error("Employee not found for sno:", updatedVal.sno);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const saveEmployee = (val) => {
  const sno = employees.value.length + 1;
  const newEmployee = { ...val, sno };
  try {
    userStore.post("employees", newEmployee);
    employees.value.push(newEmployee);
    addEmployeeDialog.value = false;
  } catch (e) {
    console.error(e);
  }
};
</script>
