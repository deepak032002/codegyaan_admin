export function getPatchObject<T>(newObj: T, oldObj: T): Partial<T | void | undefined> {
    const compareObj = (newObj: any, oldObj: any): any => {
        const returnObj: any = {}
        for (const i in newObj) {
            if (typeof newObj[i] === 'object') {
                if (JSON.stringify(newObj[i]) !== JSON.stringify(oldObj[i])) {
                    returnObj[i] = newObj[i]
                }
            } else {
                if (newObj[i] !== oldObj[i]) {
                    returnObj[i] = newObj[i]
                }
            }
        }
        return Object.keys(returnObj).length > 0 ? returnObj : undefined
    }

    return compareObj(newObj, oldObj)
}