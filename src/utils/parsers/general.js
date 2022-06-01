export const onlyNumbers = (value) => value.replace(/\D/g, '');

export const parseCellphone = (value) => value.replace(/(?!\+)\D/g, '');
