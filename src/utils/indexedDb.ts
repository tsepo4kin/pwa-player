import localforage from 'localforage';

localforage.config({
  name: 'react-player',
  storeName: 'react-player-store',
});

export default class DataStorage {
  public static set = (key: string, value: any, callback?: any) => {
    return localforage.setItem(key, value, callback);
  };

  public static get = (key: string, callback?: any) => {
    return localforage.getItem(key, callback);
  };

  public static delete = (key: string, callback?: any) => {
    return localforage.removeItem(key, callback);
  };
}

export function blobToArrayBuffer(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', (_) => {
      resolve(reader.result);
    });
    reader.addEventListener('error', reject);
    reader.readAsArrayBuffer(blob);
  });
}

export function arrayBufferToBlob(buffer: ArrayBuffer, type: string) {
  return new Blob([buffer], {type: type});
}

export const formatTime = (ms?: number): string => {
  if (typeof ms !== 'number' || !Number.isFinite(ms) || ms < 0) {
    return '--:--'
  }

  const hours = Math.floor(ms / 60 / 60)
  const minutes = Math.floor((ms % 3600) / 60)
  const seconds = Math.floor((ms % 3600) % 60)
  const time: (number | string)[] = [
    getNumberWithLeadingZero(minutes),
    getNumberWithLeadingZero(seconds),
  ]

  if (hours) {
    time.unshift(hours)
  }

  return time.join(':')
}

const getNumberWithLeadingZero = (n: number) => `${n < 10 ? '0' : ''}${n}`