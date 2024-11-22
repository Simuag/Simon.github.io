<script lang="ts">
  import Ps1 from './components/Ps1.svelte';
  import Input from './components/Input.svelte';
  import History from './components/History.svelte';
  import { theme } from './stores/theme';
  import { commands } from './utils/commands';
  import AboutMeModal from './components/AboutMeModal.svelte';

  let output = '';
  let showAboutMe = false;

  async function handleCommand(event: CustomEvent) {
    const command = event.detail;
    const [cmd, ...args] = command.split(' ');

    if (commands[cmd]) {
      const result = await commands[cmd](args);

      if (cmd === 'aboutme') {
        showAboutMe = true;
      } else if (typeof result === 'string') {
        output = result;
      }
    } else {
      output = `Command not found: ${cmd}`;
    }
  }

  function closeAboutMe() {
  console.log("Closing modal"); // For debugging
  showAboutMe = false;
}

</script>

<svelte:head>
  {#if import.meta.env.VITE_TRACKING_ENABLED === 'true'}
    <script
      async
      defer
      data-website-id={import.meta.env.VITE_TRACKING_SITE_ID}
      src={import.meta.env.VITE_TRACKING_URL}
    ></script>
  {/if}
</svelte:head>

<main
  class="h-full border-2 rounded-md p-4 overflow-auto text-xs sm:text-sm md:text-base"
  style="background-color: {$theme.background}; color: {$theme.foreground}; border-color: {$theme.green};"
>
  <History />

  <div class="flex flex-col md:flex-row">
    <Ps1 />
    <Input on:command={handleCommand} />
  </div>

  {#if output && !showAboutMe}
    <div class="mt-4">
      {@html output}
    </div>
  {/if}

  {#if showAboutMe}
    <AboutMeModal on:close={closeAboutMe} />
  {/if}
</main>
