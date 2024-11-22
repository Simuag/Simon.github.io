<script>
  export let onClose; // Define onClose as a prop
  import { fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
</script>


 <div class="modal-backdrop" 
     on:click={onClose} 
     in:fade={{ duration: 1000 }} 
     out:fade={{ duration: 1000 }}>
  <div class="modal" 
       on:click|stopPropagation 
       transition:scale={{ duration: 1000, start: 0.8 }}>
    <button class="close-btn" on:click={onClose}>X</button>
    <div class="modal-content">
      <img src="https://imgur.com/PdUccMo.png" alt="Simon" width="500" margin-top="1050" height="600" class="modal-img" />
      <div class="text">
        <p class = "paragraph">Hi, I'm Simon. I am a junior at UCLA pursuing a dual concentration in Computer Science + Linguistics. I have a deep passion for problem solving, cybersecurity, and software engineering.</p>
        
        <p class = "paragraph">I thrive in environments where complex challenges arise often, where I can develop innovative solutions, and where I can continue to grow my technical expertise.</p>

        <p class = "paragraph">Some of my favorite classes/academic experiences would be Statistical Programming, Software Construction, and Computer Architecture. These classes have sharpened my skills in creating systems, analyzing data, and working with the intricacies of computing.</p>

        <p class = "paragraph">Outside of academics, I greatly enjoy nature. Some hobbies that fuel my spirit are hiking and rock climbing.</p>

        <p class = "paragraph">I am also proud to have received the Academic Advancement Scholarship, which recognizes my dedication to always giving every task 100%. I'm driven by a desire to continuously grow and learn, as well as communicate effectively.</p>

        <p class = "paragraph">I bring understanding and resourcefulness to every challenge I face.</p>
      </div>
    </div>
  </div>
</div>

<style>
  .modal-backdrop { 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
   }
  .modal { 
        background: #0A1E24;
        padding: 1em;
        border-radius: 8px;
        max-width: 1200px;
        width: 120%; 
        max-height: 1200px;
        height: 90%;
         
        transform: scale(0.9); /* Start slightly smaller */
        transition: opacity 0.3s ease, transform 0.3s ease;
        box-shadow: 0 0 20px 5px rgba(31, 140, 59, 0.7);
        animation: glow 2s infinite;
    }
  .close-btn {
        position: absolute;
        top: 1em;
        right: 1em;
        background: transparent;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
  }
  .text {
    max-width: 600px;
    margin-left: 550px;
    margin-top: -650px;
    font-size: 18px;
    font-family: 'Lora', serif;
  }
  .modal-img {
     border-radius: 20px;
     margin-top: 40px;
  }
  .paragraph {
    padding-bottom: 1.5em;
  }
</style>
