<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Root } from "~/type/typ";

const open = ref(false);
defineShortcuts({
  o: () => (open.value = !open.value),
});

// const countries = ref<Root>([]);
// onMounted(async () => {
//   try {
//     const response = await fetch("https://restcountries.com/v3.1/all");
//     const data = await response.json();
//     countries.value = data;
//     console.log(countries.value);
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//   }
//   console.log(countries.value);
// });

// const filteredCountries = computed(() => {
//   return countries.value.filter((country) => {
//     return country.name.common
//       .toLowerCase()
//       .startsWith(searchQuery.value.toLowerCase());
//   });
// });

// const searchQuery = ref("");
// const filteredCountries = computed(() => {
//   const filtered = countries.value.filter((country) => {
//     return country.name.common
//       .toLowerCase()
//       .includes(searchQuery.value.toLowerCase());
//   });

//   if (filtered.length === 0 && searchQuery.value.trim() !== "") {
//     return [
//       {
//         name: {
//           common: `don't have ${searchQuery.value}`,
//         },
//       },
//     ];
//   }

//   return filtered;
// });

// const selectedRegion = ref("");
// const countryData = ref(null);

// const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

// async function getRegionData() {
//   if (!selectedRegion.value) return;

//   try {
//     const response = await fetch(
//       `https://restcountries.com/v3.1/region/${selectedRegion.value}`
//     );
//     const data = await response.json();
//     countryData.value = data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
const isLoading = ref(true);
const countries = ref<Root>([]);
onMounted(async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    countries.value = data;
    isLoading.value = false;
    console.log("length :" + countries.value.length);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

const searchQuery = ref("");
const selectedRegion = ref("");
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const filteredCountries = computed(() => {
  let filtered = countries.value;

  // Filter by searchQuery
  if (searchQuery.value.trim() !== "") {
    filtered = filtered.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by selectedRegion
  if (selectedRegion.value !== "") {
    filtered = filtered.filter(
      (country) => country.region === selectedRegion.value
    );
  }

  return filtered;
});

const countryData = ref(null);

// เมื่อมีการเปลี่ยนแปลงใน selectedRegion ให้เรียกฟังก์ชัน getRegionData เพื่อเรียกข้อมูลประเทศใน region นั้น
async function getRegionData() {
  if (!selectedRegion.value) return;

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${selectedRegion.value}`
    );
    const data = await response.json();
    countryData.value = data; // กำหนดข้อมูลประเทศที่ได้รับลงในตัวแปร countryData
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const numPages = ref<number>(1);
watchEffect(() => {
  if (filteredCountries?.value.length > 0) {
    numPages.value = Math.ceil(
      filteredCountries.value.length / records_per_page
    );
    // ตรวจสอบหน้าปัจจุบันเมื่อมีการเปลี่ยน numPages
    if (current_page.value > numPages.value) {
      current_page.value = numPages.value; // ปรับหน้าปัจจุบันให้ไม่เกินจำนวนหน้าทั้งหมด
    }
  } else {
    numPages.value = 1; // ถ้าไม่มีข้อมูลให้ตั้งค่า numPages เป็น 1
  }
});

const paginatedCountries = computed(() => {
  const startIndex = (current_page.value - 1) * records_per_page;
  return filteredCountries.value.slice(
    startIndex,
    startIndex + records_per_page
  );
});

function changePage(page: number) {
  current_page.value = page;
}

let current_page = ref(1);
let records_per_page = 8;

function clearSearch() {
  searchQuery.value = "";
}

function countAllCountries() {
  return countries.value.length;
}
countAllCountries();
</script>

<template>
  <div>
    <!-- <NavBar /> -->
    <div class="mx-10 mt-5">
      <div class="flex sm:flex-col lg:flex-row lg:justify-between">
        <div>
          <UInput
            icon="i-heroicons-magnifying-glass-20-solid"
            size="sm"
            color=""
            :trailing="false"
            placeholder="Search for a country..."
            v-model="searchQuery"
            class="bg-white text-primaryText m-3"
          />
        </div>
        <div>
          <select
            class="border-2 rounded-md p-2"
            v-model="selectedRegion"
            @change="getRegionData"
          >
            <option value="">Select Region</option>
            <option v-for="region in regions" :value="region" :key="region">
              {{ region }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <div class="flex flex-row justify-between my-10">
          <div>
            <h1 class="text-2xl font-bold">Countries</h1>
          </div>
        </div>

        <div class="grid sm:grid-cols-1 grid-cols-12 gap-10">
          <CountryCard
            class="col-span-3"
            v-for="country in paginatedCountries"
            :key="country.name.common"
            :name="country.name.common"
            :population="country.population"
            :region="country.region"
            :capital="country.capital"
            :flags="country.flags.png"
            :alt="country.name.common"
          />
        </div>
        <!-- pagination area -->
        <div class="flex justify-center mt-10">
          <UPagination
            size="xl"
            v-model:model-value="current_page"
            :total="countries.length"
            :page-count="8"
            show-last
            show-first
            @update:model-value="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
