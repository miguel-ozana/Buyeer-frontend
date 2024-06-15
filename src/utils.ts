export function getDeviceId() {
  console.log('Checking localStorage access');
  if (typeof window !== 'undefined') {
    console.log('Accessing localStorage on client side');
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  }
  console.log('localStorage not available on server side');
  return null;
}
