export const trim = (str: string) => {
  return str.replace(/^\s+|\s+$/gm, '')
}

export const deepCopy = <T>(obj: T) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  const copy: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key])
    }
  }

  return copy as T
}

export const deepCopyMap = <T, U>(map: Map<T, U>): Map<T, U> => {
  const copy = new Map<T, U>()
  for (const [key, value] of map.entries()) {
    if (typeof value === 'object' && value !== null) {
      copy.set(key, deepCopyMap(value as unknown as Map<any, any>) as U)
    } else {
      copy.set(key, value)
    }
  }

  return copy
}
