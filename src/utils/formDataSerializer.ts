const formDataSerializer = (data: any) => {

    const formData = new FormData();

    for (const item in data) {
        if (typeof data[item] === 'object' && !(data[item] instanceof File)) {
            for (const innerItem in data[item]) {
                formData.append(`${item}[${innerItem}]`, data[item][innerItem])
            }
        } else {
            formData.append(item, data[item])
        }
    }
    return formData
}

export default formDataSerializer