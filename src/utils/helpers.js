export function pathInfo(s) {
    s=s.match(/(.*?[\\/:])?(([^\\/:]*?)(\.[^\\/.]+?)?)(?:[?#].*)?$/);
    return {path:s[1],file:s[2],name:s[3],ext:s[4]};
}

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}