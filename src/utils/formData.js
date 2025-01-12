export const formDataConvert = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item, index) => {
        if (item instanceof File || item instanceof Blob) {
          delete item.preview;
          formData.append(`${key}[${index}]`, item);
        } else if (typeof item === "object") {
          Object.keys(item).forEach((objKey) => {
            formData.append(`${key}[${index}][${objKey}]`, item[objKey]);
          });
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (data[key] instanceof File || data[key] instanceof Blob) {
      delete data[key].preview;
      formData.append(key, data[key]);
    } else if (typeof data[key] === "object") {
      Object.keys(data[key]).forEach((objKey) => {
        formData.append(`${key}[${objKey}]`, data[key][objKey]);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
};
