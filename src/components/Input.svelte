<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import { history } from '../stores/history';
  import { theme } from '../stores/theme';
  import { commands } from '../utils/commands';
  import { track } from '../utils/tracking';
  import AboutMeModal from './AboutMeModal.svelte'; // Import the modal component

  let command = '';
  let historyIndex = -1;
  let showAboutMe = false; // Track the modal visibility

  let input: HTMLInputElement;

   function closeAboutMe() {
    showAboutMe = false; // Set showAboutMe to false to hide the modal
  }

  onMount(() => {
    input.focus();

    if ($history.length === 0) {
      const command = commands['banner'] as () => string;

      if (command) {
        const output = command();

        $history = [...$history, { command: 'banner', outputs: [output] }];
      }
    }
  });

  afterUpdate(() => {
    input.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const [commandName, ...args] = command.split(' ');
      console.log("Command:", commandName); 
      if (import.meta.env.VITE_TRACKING_ENABLED === 'true') {
        track(commandName, ...args);
      }

      const commandFunction = commands[commandName];
      if (commandFunction) {
        const output = await commandFunction(args);

        if (commandName !== 'clear') {
          $history = [...$history, { command, outputs: [output] }];
        }
        if (commandName == 'aboutme') {
          showAboutMe = true; // Show the modal when the 'aboutme' command is entered
        }
      } else {
        const output = `${commandName}: command not found`;

        $history = [...$history, { command, outputs: [output] }];
      }

      command = '';
    } else if (event.key === 'ArrowUp') {
      if (historyIndex < $history.length - 1) {
        historyIndex++;

        command = $history[$history.length - 1 - historyIndex].command;
      }

      event.preventDefault();
    } else if (event.key === 'ArrowDown') {
      if (historyIndex > -1) {
        historyIndex--;
        command =
          historyIndex >= 0
            ? $history[$history.length - 1 - historyIndex].command
            : '';
      }
      event.preventDefault();
    } else if (event.key === 'Tab') {
      event.preventDefault();

      const autoCompleteCommand = Object.keys(commands).find((cmd) =>
        cmd.startsWith(command),
      );

      if (autoCompleteCommand) {
        command = autoCompleteCommand;
      }
    } else if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();

      $history = [];
    }
  };
</script>

<svelte:window
  on:click={() => {
    input.focus();
  }}
/>

<div class="flex w-full">
  <p class="visible md:hidden">❯</p>

  <input
    id="command-input"
    name="command-input"
    aria-label="Command input"
    class="w-full px-2 bg-transparent outline-none"
    type="text"
    style={`color: ${$theme.foreground}`}
    bind:value={command}
    on:keydown={handleKeyDown}
    bind:this={input}
  />
</div>

{#if showAboutMe}
  <AboutMeModal onClose={closeAboutMe} />
{/if}
