import { history } from '../stores/history';


const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string | { showModal: boolean }> | string | { showModal: boolean }> = {
  help: () => {
    return `
    Available commands:
    ${Object.keys(commands).join(', ')}
    `;
  },
  vim: () => {
    return `⛔ Vim sucks, use 'emacs' 💻`;
  },
  aboutme: () => '',

  resume: () => {
    window.open("https://drive.google.com/file/d/19heUnIg3TpR0DNAyeVqdmfF-oYei6gZ9/view?usp=sharing", "_blank");
    return "Opening resume in a new tab...";
  },
  emacs: () => `🙏 Praise Paul Eggert...`,
  echo: (args: string[]) => args.join(' '),
  clear: () => {
    history.set([]);
    return 'Screen cleared! ✨';
  },
  email: () => '📧 Contact: yegikyansimon@gmail.com',
  weather: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return '📝 Usage: weather (anywhere on Earth)';
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);
    return weather.text();
  },
  dadjoke: async () => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: { "Accept": "application/json" }
  });
  const data = await response.json();
  return `
${data.joke}

  ======o     o======
   ___________
  |___________|  
   |\\  /\\  /\\|
   |_\\/__\\/__|
  |___________| Badum Tss
`;
},
  
  banner: () => `
  ███████╗██╗███╗   ███╗ ██████╗ ███╗   ██╗
  ██╔════╝██║████╗ ████║██╔═══██╗████╗  ██║
  ███████╗██║██╔████╔██║██║   ██║██╔██╗ ██║
  ╚════██║██║██║╚██╔╝██║██║   ██║██║╚██╗██║
  ███████║██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║
  ╚══════╝╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                         
  Type 'help' to see list of available commands. 🌐
  `,
};
