<script setup lang="ts">
import { useUserStore } from '@/lib/shared/shared.stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useUserStore();
const {
  username,
  id: userId,
  avatarUrl,
  email,
  location,
  description,
  joinedAt,
} = storeToRefs(store);

const formRef = ref<HTMLFormElement>();

function onFormSubmit() {
  const formData = new FormData(formRef.value);
  formData.forEach((value, key) => console.log(`${key}: ${value}`));
}
</script>

<template>
  <div class="h-full">
    <div
      class="w-full mx-auto flex py-24 max-w-md lg:max-w-2xl xl:max-w-3xl gap-4 md:gap-6 h-full"
    >
      <div class="w-72 flex justify-center p-2 shrink-0">
        <div class="text-center">
          <img class="rounded-full mb-10" :src="avatarUrl" :alt="username" />
          <div class="font-bold text-2xl">{{ username }}</div>
          <div>Joined on {{ joinedAt }}</div>
          <div class="divider"></div>
          <div>Badges</div>
        </div>
      </div>
      <form class="grow" @submit.prevent="onFormSubmit" ref="formRef">
        <div class="form-control">
          <label class="label" for="userId">
            <span class="label-text">User ID</span>
          </label>
          <input
            type="text"
            :value="userId"
            name="userId"
            class="input w-full"
            disabled
          />
        </div>
        <div class="form-control">
          <label class="label" for="username">
            <span class="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            :value="username"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            type="text"
            name="email"
            :value="email"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label" for="avatarUrl">
            <span class="label-text">Avatar Url</span>
          </label>
          <input
            type="text"
            name="avatarUrl"
            :value="avatarUrl"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label" for="country">
            <span class="label-text">Country</span>
          </label>
          <input
            type="text"
            name="country"
            :value="location"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label" for="description">
            <span class="label-text">Description</span>
          </label>
          <textarea
            name="description"
            :value="description"
            class="textarea-bordered textarea resize-none text-base"
          ></textarea>
        </div>

        <button class="btn btn-primary mt-5">Save changes</button>
      </form>
    </div>
  </div>
</template>
