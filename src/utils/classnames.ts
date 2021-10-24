type Primitives = null | undefined | string | number | boolean;

type ClassType = Primitives | Record<string, Primitives> | ClassType[];

function isNotEmpty(
  cls: ClassType
): cls is Exclude<ClassType, null | undefined | boolean> {
  return typeof cls !== 'boolean' && !!cls;
}

export default function classNames(...clsArgs: ClassType[]): string {
  return clsArgs
    .filter(isNotEmpty)
    .map(cls => {
      if (Array.isArray(cls)) {
        return classNames(...cls);
      }

      if (typeof cls === 'object') {
        return Object.keys(cls)
          .filter(key => !!cls[key])
          .join(' ');
      }

      return cls;
    })
    .join(' ')
    .trim();
}
