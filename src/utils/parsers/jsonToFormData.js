export function buildFormData(formData, data, parentKey) {
  const isArray = Array.isArray(data);

  if (isArray) {
    if (data.length === 0) {
      buildFormData(formData, '', `${parentKey}[]`);
    } else {
      data.forEach((value) => {
        buildFormData(formData, value, `${parentKey}[]`);
      });
    }

    return;
  }

  if (
    data &&
    !isArray &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });

    return;
  }

  const value = data == null ? '' : data;

  formData.append(parentKey, value);
}
