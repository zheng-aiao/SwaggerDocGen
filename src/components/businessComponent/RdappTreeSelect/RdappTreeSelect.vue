<template>
  <div class="item">
    <span v-if="title" class="label">{{ title }}</span>
    <SelectDistrict v-if="props.district" v-bind="$attrs" v-on="$listeners"></SelectDistrict>
    <SelectOrganization v-if="props.orgs" v-bind="$attrs" v-on="$listeners"></SelectOrganization>
    <SelectDictionary v-if="props.dict" v-bind="$attrs" v-on="$listeners"></SelectDictionary>
  </div>
</template>

<script setup>
  import { defineAsyncComponent } from 'vue'

  const SelectDistrict = defineAsyncComponent(() => import('./SelectDistrict.vue'))
  const SelectOrganization = defineAsyncComponent(() => import('./SelectOrganization.vue'))
  const SelectDictionary = defineAsyncComponent(() => import('./SelectDictionary.vue'))

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    dict: {
      type: Boolean,
      default: false
    },
    district: {
      type: Boolean,
      default: false
    },
    orgs: {
      type: Boolean,
      default: false
    }
  })
</script>
