<template>
  <div class="h-screen flex justify-center items-center">
    <div class="m-auto text-center">
      <h1 class="text-4xl font-bold uppercase">404 Not Found</h1>
      <p class="mb-2">The page that you are trying to reach is unavailable.</p>
      <a @click="$router.go(-1)" class="btn btn-primary btn-sm">Take me back</a>
    </div>
  </div>
</template>
