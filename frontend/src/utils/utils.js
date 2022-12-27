import { ethers } from 'ethers';
import { SIGN_MESSAGE } from '@/config/message';

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

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    // eslint-disable-next-line no-bitwise
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-bitwise, no-mixed-operators
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function verifyMessage(
  userAddress,
  nonce,
  sign,
) {
  try {
    const address = ethers.utils.verifyMessage(
      decodeTemplate(SIGN_MESSAGE, { address: userAddress, nonce }),
      sign,
    );
    return userAddress === address;
  } catch (error) {
    return false;
  }
}

export function decodeTemplate(template, data) {
  const vars = template.match(/\{.*\}/g);
  for (const vari of vars) {
    const name = vari.replace(/\{(.*)\}/, '$1');
    template = template.replace(vari, data[name] || '');
  }
  return template;
}
