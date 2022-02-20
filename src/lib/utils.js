const propComparator = (propName) => (a, b) =>
  a[propName].toLowerCase() == b[propName].toLowerCase()
    ? 0
    : a[propName].toLowerCase() < b[propName].toLowerCase()
    ? -1
    : 1;

export default propComparator;
