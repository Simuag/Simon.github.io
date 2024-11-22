const output = document.getElementById('output');
const input = document.getElementById('input');

const commands = {
  about: "I am a developer working on exciting projects!",
  projects: "Check out my GitHub for more details.",
  clear: () => { output.innerHTML = ''; }
};

function typeText(text) {
  let i = 0;
  const speed = 100;
  function type() {
    if (i < text.length) {
      output.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const command = input.value;
    output.innerHTML += `<br/>$ ${command}`;
    if (commands[command]) {
      if (typeof commands[command] === 'function') {
        commands[command]();
      } else {
        typeText(commands[command]);
      }
    } else {
      typeText('Command not found.');
    }
    input.value = '';
    output.scrollTop = output.scrollHeight;
  }
});

// Theme toggle
const themeButton = document.createElement('button');
themeButton.textContent = "Toggle Theme";
document.body.appendChild(themeButton);

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.body.classList.toggle('dark');
});
