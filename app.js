let deferredPrompt;
const installButton = document.querySelector('#installButton');
const status = document.querySelector('#status');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installButton.textContent = 'Install App';
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) {
    status.textContent = 'On iPhone, use Share → Add to Home Screen. On desktop, use your browser’s install icon.';
    return;
  }
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  status.textContent = outcome === 'accepted' ? 'Installation started.' : 'Installation cancelled.';
  deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
  status.textContent = 'My App was installed successfully.';
  deferredPrompt = null;
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}
