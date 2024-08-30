export function getPropertyGivenStringPath(path: string, obj: object, separator = '.'): any { // https://stackoverflow.com/a/22129960
    const properties = Array.isArray(path) ? path : path.split(separator)
    return properties.reduce((prev, curr) => prev?.[curr], obj)
}

export function castStringToNativeType(value: string): any {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;

    const num = Number(value);
    if (isNaN(num)) return value;
    return num;
}

export function convertURLSearchParamsToObject(params: URLSearchParams): Record<string, any> {
    const obj: Record<string, any> = {};

    for (const [key, value] of params.entries())
        obj[key] = castStringToNativeType(value);

    return obj;
}
