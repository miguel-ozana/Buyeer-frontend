export function getDeviceId() {
  if (typeof window !== 'undefined') { // Verifica se o código está sendo executado no lado do cliente
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
  }
  return null; // Ou outra lógica para lidar com o lado do servidor
}
