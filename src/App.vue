<template>
  <div class="bg-[#1C1C1E] min-h-screen">
    <Suspense>
      <router-view />
      <template #fallback>
        <h1>Loading</h1>
      </template>
    </Suspense>
  </div>
</template>
<script setup></script>