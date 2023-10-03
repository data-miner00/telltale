<script setup lang="ts">
import { SOCKET_URL } from '@/lib/shared/shared.constants';
import { useUserStore } from '@/lib/shared/shared.stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useUserStore();
const {
  username,
  alias,
  id: userId,
  avatarUrl,
  email,
  location,
  description,
  joinedAt,
} = storeToRefs(store);

const isUpdating = ref(false);
const formRef = ref<HTMLFormElement>();
const aliasInputRef = ref<HTMLInputElement>();
const emailInputRef = ref<HTMLInputElement>();
const avatarUrlInputRef = ref<HTMLInputElement>();
const locationInputRef = ref<HTMLInputElement>();
const descriptionInputRef = ref<HTMLInputElement>();

type ProfileForm = {
  alias: string;
  email: string;
  avatarUrl: string;
  location: string;
  description: string;
};

async function onFormSubmit() {
  const profileForm: ProfileForm = {
    alias: aliasInputRef.value?.value || '',
    email: emailInputRef.value?.value || '',
    avatarUrl: avatarUrlInputRef.value?.value || '',
    location: locationInputRef.value?.value || '',
    description: descriptionInputRef.value?.value || '',
  };

  try {
    isUpdating.value = true;
    const res = await fetch(`${SOCKET_URL}/api/profile/${userId.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileForm),
    });

    console.log(res);
  } catch (error) {
    console.error(error);
  } finally {
    isUpdating.value = false;
  }
}
</script>

<template>
  <div class="h-full">
    <div
      class="w-full mx-auto flex py-24 max-w-md lg:max-w-2xl xl:max-w-3xl gap-4 md:gap-6 h-full"
    >
      <div class="w-72 flex justify-center p-2 shrink-0">
        <div class="text-center">
          <img
            class="rounded-full mb-10 mx-auto w-40 h-40"
            :src="avatarUrl"
            :alt="username"
          />
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
            <span class="label-text">Alias</span>
          </label>
          <input
            ref="aliasInputRef"
            type="text"
            name="alias"
            :value="alias"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            ref="emailInputRef"
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
            ref="avatarUrlInputRef"
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
            ref="locationInputRef"
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
            ref="descriptionInputRef"
            name="description"
            :value="description"
            class="textarea-bordered textarea resize-none text-base"
          ></textarea>
        </div>

        <button
          class="btn btn-primary mt-5"
          :class="{ 'btn-disabled': isUpdating }"
        >
          Save changes
        </button>
      </form>
    </div>
  </div>
</template>
