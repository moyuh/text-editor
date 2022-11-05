const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;

    //remove hidden class from btn
    butInstall.classList.toggle('hidden', false);
});

//  a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if(!promptEvent) {
        return;
    }

    promptEvent.prompt();

    //reset deferred prompt
    window.deferredPromt = null;

    butInstall.classList.toggle('hidden', true)
});

//handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});