<script setup lang="ts">
import type { Root } from "~/type/typ";
const { params } = useRoute();
const country = ref<Root>([]);
const allFullNames = ref<string[]>([]);
const isLoading = ref(true);
const haveBorders = ref(false);
const NativeNameString = ref<string>("");

console.log(params.slug[0]);

onBeforeMount(async () => {
  const countries = params.slug[0];

  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countries}`
    );
    const data = await response.json();
    country.value = data;
    const NativeName = data[0]?.name.nativeName;
    const firstNativeName = NativeName[Object.keys(NativeName)[0]]; // เข้าถึง object ตัวแรกของ nativeName
    NativeNameString.value = firstNativeName.common;
    const borders = data[0]?.borders;
    if (borders) {
      haveBorders.value = true;
    }
  } catch (error) {
    console.error("Error fetching countries:", error);
  }

  // if (country.value[0]?.borders) {
  //   console.log("borders: " + country.value[0]?.borders);
  // }
  // if (country.value && country.value[0]?.borders) {
  //   const borders = country.value[0]?.borders;
  //   const fullNames: string[] = [];

  //   borders.forEach(async (borderCode: string) => {
  //     try {
  //       const response = await fetch(
  //         `https://restcountries.com/v3.1/alpha/${borderCode}`
  //       );
  //       const data = await response.json();
  //       const fullName = data[0]?.name?.common;
  //       if (fullName) {
  //         fullNames.push(fullName);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching border country:", error);
  //     }
  //   });

  //   // Waiting for all fetch requests to complete before logging
  //   await Promise.all(fullNames);
  //   console.log("Full names of borders:", fullNames);
  //   const allFullName = fullNames.join(", ");
  //   console.log("allFullName: " + allFullName);
  // }

  // if (country.value && country.value[0]?.borders) {
  //   const borders = country.value[0]?.borders;
  //   const promises = borders.map(async (borderCode: string) => {
  //     try {
  //       const response = await fetch(
  //         `https://restcountries.com/v3.1/alpha/${borderCode}`
  //       );
  //       const data = await response.json();
  //       return data[0]?.name?.common;
  //     } catch (error) {
  //       console.error("Error fetching border country:", error);
  //       return null;
  //     }
  //   });

  //   const allFullNames = await Promise.all(promises);
  //   console.log("Full names of borders:", allFullNames);
  // }

  if (country.value && country.value[0]?.borders) {
    const borders = country.value[0]?.borders;
    const promises = borders.map(async (borderCode: string) => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${borderCode}`
        );
        const data = await response.json();
        return data[0]?.name?.common;
      } catch (error) {
        console.error("Error fetching border country:", error);
        return null;
      }
    });

    (async () => {
      const fetchedNames = await Promise.all(promises);
      allFullNames.value = fetchedNames.filter((name) => name !== null);
    })();
  }
});

onMounted(() => {
  // Simulating loading delay
  setTimeout(() => {
    isLoading.value = false; // Set loading state to false when data is loaded
    // Here fetch the country data and assign it to country.value
  }, 2000); // Simulated delay of 2 seconds
});
</script>
<template>
  <div v-if="country" class="sm:mx-5 lg:mx-40 mt-5">
    <!-- Back button -->
    <div class="my-20">
      <nuxt-link to="/">
        <button
          class="flex flex-row items-center gap-2 py-2 px-10 rounded-md border-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
          >
            <path
              fill="black"
              d="m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z"
            />
          </svg>
          Back
        </button>
      </nuxt-link>
    </div>
    <!-- Country information -->
    <div>
      <div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Country flag -->
        <div class="overflow-hidden">
          <!-- Skeleton loading for image -->
          <template v-if="isLoading">
            <div class="skeleton-image h-full w-full">
              <div class="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="256"
                  height="256"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="white"
                    d="M6 34a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v30a1 1 0 0 1-1 1"
                    class="clr-i-outline clr-i-outline-path-1"
                  />
                  <path
                    fill="white"
                    d="M30.55 3.82a1 1 0 0 0-1 0a14.9 14.9 0 0 1-6.13 1.16a13.11 13.11 0 0 1-5.18-1.49a12.78 12.78 0 0 0-5-1.45A10.86 10.86 0 0 0 9 2.85v2.23A8.8 8.8 0 0 1 13.25 4a11.22 11.22 0 0 1 4.2 1.28a14.84 14.84 0 0 0 6 1.66A18.75 18.75 0 0 0 29 6.12v12.83a16.16 16.16 0 0 1-5.58.93a13.11 13.11 0 0 1-5.18-1.49a12.78 12.78 0 0 0-5-1.45a10.86 10.86 0 0 0-4.24.85V20a8.8 8.8 0 0 1 4.25-1.08a11.22 11.22 0 0 1 4.2 1.28a14.84 14.84 0 0 0 6 1.66a16.79 16.79 0 0 0 7-1.37a1 1 0 0 0 .55-.89V4.67a1 1 0 0 0-.45-.85"
                    class="clr-i-outline clr-i-outline-path-2"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </div>
            </div>
          </template>
          <!-- Real image when not loading -->
          <img
            v-else
            :src="country[0]?.flags.png"
            :alt="country[0]?.flags.alt"
            class="h-full w-full object-contain"
          />
        </div>
        <!-- Country details -->
        <div class="flex flex-col">
          <!-- Country name -->
          <div class="font-bold text-xl mb-3">
            <!-- Skeleton loading for country name -->
            <template v-if="isLoading">
              <!-- <div class="skeleton-text w-3/4 h-10"></div> -->
              <div class="felx flex-col">
                <div class="flex">
                  <div class="skeleton-text w-60 h-10 rounded-xl mb-2"></div>
                </div>
                <div
                  class="grid sm:grid-rows-8 sm:grid-cols-1 lg:grid-rows-5 lg:grid-flow-col lg:grid-cols-2 gap-y-2 gap-x-8"
                >
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                  <div class="skeleton-text w-60 h-5 rounded-xl"></div>
                </div>
                <div>
                  <div class="skeleton-text w-60 h-10 rounded-xl mt-2"></div>
                </div>
              </div>
            </template>
            <!-- Real country name when not loading -->
            <template v-else>
              <div class="flex flex-col">
                <div class="font-bold text-2xl mb-3">
                  {{ country[0]?.name.common }}
                </div>
                <div
                  class="grid lg:grid-rows-5 lg:grid-flow-col lg:grid-cols-2 items-center"
                >
                  <div class="font-thin sm:mt-8">
                    <span class="font-semibold"> Native name: </span>
                    <!-- {{ country[0]?.name.nativeName?.nld?.common }} -->
                    {{ NativeNameString }}
                  </div>
                  <div class="font-thin">
                    <span class="font-semibold"> Population: </span
                    >{{ country[0]?.population.toLocaleString() }}
                  </div>
                  <div class="font-thin">
                    <span class="font-semibold"> Region: </span
                    >{{ country[0]?.region }}
                  </div>
                  <div class="font-thin">
                    <span class="font-semibold">Subregion: </span
                    >{{ country[0]?.subregion }}
                  </div>
                  <div v-if="country[0]?.capital?.length" class="font-thin">
                    <span class="font-semibold">Capital: </span>

                    {{ country[0]?.capital[0] }}
                  </div>
                  <div class="font-thin">
                    <span class="font-semibold"> Top Level Domain: </span>

                    <span v-for="(item, index) in country" :key="index">
                      {{ item?.tld?.join("  ") }}
                    </span>
                  </div>
                  <div class="font-thin">
                    <span class="font-semibold"> Currencies: </span>

                    <span
                      v-for="(currency, key) in country[0]?.currencies"
                      :key="key"
                    >
                      {{ currency?.name }},
                    </span>
                  </div>
                  <div class="font-thin">
                    <span class="font-semibold"> Languages: </span>
                    <span v-for="(item, index) in country" :key="index">
                      <span v-for="(value, key) in item.languages">
                        {{ value }},
                      </span>
                    </span>
                  </div>
                </div>
                <div class="font-thin">
                  <span class="font-semibold"> Borders Country: </span>

                  <span
                    v-for="(name, index) in allFullNames"
                    v-if="haveBorders"
                    :key="index"
                    class="hover:text-red-500 hover:bg-black hover:bg-opacity-10 hover:rounded-xl hover:px-2 hover:py-1"
                  >
                    <nuxt-link :to="`/country/${name}`">
                      &nbsp; {{ name }} &nbsp;
                    </nuxt-link>
                  </span>
                  <span v-if="!haveBorders"> No border country </span>
                </div>
              </div>
            </template>
          </div>
          <!-- Other country details -->
          <!-- Similar approach for other country details with skeleton loading -->
        </div>
      </div>
    </div>
  </div>
</template>

<!-- this template no skeleton -->
<!-- <template>
  <div v-if="country" class="mx-40 mt-5">
    <div class="my-20">
      <nuxt-link to="/"
        ><button
          class="flex flex-row items-center gap-2 py-2 px-10 rounded-md border-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
          >
            <path
              fill="black"
              d="m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z"
            /></svg
          >Back
        </button></nuxt-link
      >
    </div>
    <div>
      <div class="grid grid-cols-2 gap-10">
        <div class="overflow-hidden">
          <img
            :src="country[0]?.flags.png"
            :alt="country[0]?.flags.alt"
            class="h-full w-full object-contain"
          />
        </div>
        <div class="flex flex-col">
          <div class="font-bold text-xl mb-3">
            {{ country[0]?.name.common }}
          </div>
          <div class="grid grid-rows-5 grid-flow-col grid-cols-2 items-center">
            <div>
              <span class="font-semibold"> Native name: </span
              >{{ country[0]?.name.nativeName?.eng?.official }}
            </div>
            <div>
              <span class="font-semibold"> Population: </span
              >{{ country[0]?.population.toLocaleString() }}
            </div>
            <div>
              <span class="font-semibold"> Region: </span
              >{{ country[0]?.region }}
            </div>
            <div>
              <span class="font-semibold">Subregion: </span
              >{{ country[0]?.subregion }}
            </div>
            <div v-if="country[0]?.capital?.length">
              <span class="font-semibold">Capital: </span>
            
              {{ country[0]?.capital[0] }}
            </div>
            <div>
              <span class="font-semibold"> Top Level Domain: </span>

              <span v-for="(item, index) in country" :key="index">
                {{ item?.tld?.join("  ") }}
              </span>
            </div>
            <div>
              <span class="font-semibold"> Currencies: </span>

              <span
                v-for="(currency, key) in country[0]?.currencies"
                :key="key"
              >
                {{ currency?.name }},
              </span>
            </div>
            <div>
              <span class="font-semibold"> Languages: </span>
              <span v-for="(item, index) in country" :key="index">
                <span v-for="(value, key) in item.languages">
                  {{ value }},
                </span>
              </span>
            
            </div>
          </div>
          <div v-if="allFullNames">
            <span class="font-semibold"> Borders Country: </span>


            <span
              v-for="(name, index) in allFullNames"
              :key="index"
              class="hover:text-red-500"
            >
              <nuxt-link :to="`/country/${name}`"> {{ name }}, </nuxt-link>
            </span>
          </div>
        </div>
  
      </div>
    </div>
    <div>

    </div>
  </div>
</template> -->
<style>
/* Skeleton loading styles */
.skeleton-image {
  background-color: #ccc;
}
.skeleton-text {
  background-color: #ccc;
}
</style>
