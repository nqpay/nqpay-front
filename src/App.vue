<template>
  <Suspense>
    <router-view />
    <template #fallback>
      <h1>Loading</h1>
    </template>
  </Suspense>
</template>
<script setup></script>
