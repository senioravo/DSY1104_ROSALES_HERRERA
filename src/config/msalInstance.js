import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './msalConfig';

let msalInstance;
let eventsRegistered = false;

function registerMsalEvents(instance) {
    if (eventsRegistered) {
        return;
    }
    eventsRegistered = true;

    instance.addEventCallback((event) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
            instance.setActiveAccount(event.payload.account);
        }
    });
}

/** Una sola instancia MSAL (paso 3). */
export function getMsalInstance() {
    if (!msalInstance) {
        msalInstance = new PublicClientApplication(msalConfig);
        registerMsalEvents(msalInstance);
    }
    return msalInstance;
}
