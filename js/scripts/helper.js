export function urlB64touint8array(base64string) {
    const padding = '='.repeat((4-base64string.length % 4) % 4);
    const base64 = (base64string + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i=0; i<rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}