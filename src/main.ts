import './app.css';
import App from './App.svelte';

const targetElement = document.getElementById('app');

let app;

if (targetElement) {
  app = new App({
    target: targetElement,
  });
} else {
  console.error("Target element '#app' not found.");
}

export default app;
