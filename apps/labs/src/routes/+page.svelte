<script>
  import PageContainer from '$lib/modules/page-container/page-container.svelte';
</script>

<PageContainer>
  <svelte:fragment slot="page-content">
    <main
      class="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1"
    >
      <div class="flex-1 overflow-hidden">
        <div class="h-full dark:bg-gray-800">
          <div>
            <div class="flex flex-col items-center text-sm dark:bg-gray-800">
              <div
                class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100"
              >
                <h1
                  class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center"
                >
                  ChatGPT
                </h1>
                <div class="md:flex items-start text-center gap-3.5">
                  <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                    <h2
                      class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-6 w-6"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        ><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
                          x1="12"
                          y1="21"
                          x2="12"
                          y2="23"
                        /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
                          x1="18.36"
                          y1="18.36"
                          x2="19.78"
                          y2="19.78"
                        /><line x1="1" y1="12" x2="3" y2="12" /><line
                          x1="21"
                          y1="12"
                          x2="23"
                          y2="12"
                        /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line
                          x1="18.36"
                          y1="5.64"
                          x2="19.78"
                          y2="4.22"
                        /></svg
                      >Examples
                    </h2>
                    <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                      <button
                        class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                        >"Explain quantum computing in simple terms" →</button
                      ><button
                        class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                        >"Got any creative ideas for a 10 year old’s birthday?" →</button
                      ><button
                        class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"
                        >"How do I make an HTTP request in Javascript?" →</button
                      >
                    </ul>
                  </div>
                  <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                    <h2
                      class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        class="h-6 w-6"
                        ><path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                        /></svg
                      >Capabilities
                    </h2>
                    <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                      <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                        Remembers what user said earlier in the conversation
                      </li>
                      <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                        Allows user to provide follow-up corrections
                      </li>
                      <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                        Trained to decline inappropriate requests
                      </li>
                    </ul>
                  </div>
                  <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                    <h2
                      class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-6 w-6"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                          d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                        /><line x1="12" y1="9" x2="12" y2="13" /><line
                          x1="12"
                          y1="17"
                          x2="12.01"
                          y2="17"
                        /></svg
                      >Limitations
                    </h2>
                    <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                      <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                        May occasionally generate incorrect information
                      </li>
                      <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                        May occasionally produce harmful instructions or biased content
                      </li>
                      <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                        Limited knowledge of world and events after 2021
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="w-full h-32 md:h-48 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2"
      >
        <form
          class="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-3xl"
        >
          <div class="relative flex h-full flex-1 md:flex-col">
            <div class="flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center" />
            <div
              class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
            >
              <textarea
                tabindex="0"
                data-id="root"
                rows="1"
                class="max-h-[200px] h-6 overflow-y-hidden m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 outline-none focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
              /><button
                class="absolute p-1 rounded-md text-gray-500 bottom-1.5 md:bottom-2.5 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent right-1 md:right-2"
                ><svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4 mr-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  ><line x1="22" y1="2" x2="11" y2="13" /><polygon
                    points="22 2 15 22 11 13 2 9 22 2"
                  /></svg
                ></button
              >
            </div>
          </div>
        </form>
        <div
          class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6"
        >
          <a
            href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
            target="_blank"
            rel="noreferrer"
            class="underline">ChatGPT Mar 14 Version</a
          >. Free Research Preview. Our goal is to make AI systems more natural and safe to interact
          with. Your feedback will help us improve.
        </div>
      </div>
    </main>
  </svelte:fragment>
</PageContainer>
