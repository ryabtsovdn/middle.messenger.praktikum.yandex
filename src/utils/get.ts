export default function get(
  obj: any,
  path = '',
  defaultValue: unknown = null
): any {
  const parts = path.split('.');
  let res = obj;
  for (let i = 0; i < parts.length; i++) {
    res = res[parts[i]];
    if (res === undefined) {
      return defaultValue;
    }
  }
  return res ?? defaultValue;
}
