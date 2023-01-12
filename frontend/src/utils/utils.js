import { ethers } from 'ethers';
import { copy as Copy } from 'iclipboard';
import { Toast } from '@douyinfe/semi-ui';
import { SIGN_MESSAGE } from '@/config/message';

export function copy(msg) {
  if (Copy(msg)) {
    Toast.success('Copied');
  } else {
    Toast.error('Failed to copy.');
  }
}

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
    if (!item) return ret;
    const { key, value } = item;
    if (key === undefined || key === null) return ret;
    ret[key] = value || '';
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

export function formatDate(date, fmt = 'YYYY-MM-DD hh:mm:ss') {
  if (!date) return '';
  const _date = new Date(date);
  const o = {
    'M+': _date.getMonth() + 1, // 月份
    'D+': _date.getDate(), // 日
    'h+': _date.getHours(), // 小时
    'm+': _date.getMinutes(), // 分
    's+': _date.getSeconds(), // 秒
    'q+': Math.floor((_date.getMonth() + 3) / 3), // 季度
    S: _date.getMilliseconds(), // 毫秒
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${_date.getFullYear()}`).substring(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
}

export function omitText(text = '') {
  const textStr = String(text);
  if (textStr.length >= 15) {
    return String(text).replace(/(.{6})(.*)(.{4})/, '$1....$3');
  }
  return text;
}

export function filterEmptyField(data = []) {
  return data.reduce((ret, curr) => {
    const { key = '', value = '' } = curr || {};
    if (!key && !value) {
      return ret;
    }
    ret[key] = value;
    return ret;
  }, {});
}
