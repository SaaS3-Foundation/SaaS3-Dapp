export function findValueByKeyPath(data, keyPath = []) {
  const [path] = keyPath;
  if (!data[path]) return data;
  return findValueByKeyPath(data[path], keyPath.slice(1));
}
