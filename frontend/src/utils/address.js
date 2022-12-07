export function formatAddress(address = '') {
  return address.replace(/(.{6})(.*)(.{4})/, '$1....$3');
}
