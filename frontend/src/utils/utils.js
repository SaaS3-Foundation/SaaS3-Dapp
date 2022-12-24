import { ethers } from 'ethers';
import { SaaS3ABISPEC } from '@/config/types';

export function findValueByKeyPath(data, keyPath = []) {
  const [path] = keyPath;
  if (data[path] === undefined) return data;
  return findValueByKeyPath(data[path], keyPath.slice(1));
}

export function typeTransferToSaaS3Type(value) {
  const jsType = typeof value;
  if (jsType === 'number') {
    if (String(value).startsWith('-')) {
      return 'int256';
    }
    return 'uint256';
  } if (jsType === 'string') {
    if (ethers.utils.isAddress(value)) {
      return 'address';
    }
    return 'string';
  } if (jsType === 'boolean') {
    return 'bool';
  }
}

export function ArrayToObjectByKeyValue(data = []) {
  return data.reduce((ret, item) => {
    const { key, value } = item;
    if (key === undefined || key === null) return ret;
    ret[key] = value;
    return ret;
  }, {});
}

export function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = (error) => {
      rej(error);
    };
  });
}
