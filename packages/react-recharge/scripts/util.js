// credit: Cassidy on SO (https://stackoverflow.com/a/46552546/6387812)

exports.args = process.argv
  .slice(2)
  .map((val) => {
    let object = {};
    let [regexForProp, regexForVal] = (() => [
      new RegExp('^(.+?)='),
      new RegExp('=(.*)')
    ])();
    let [prop, value] = (() => [
      regexForProp.exec(val),
      regexForVal.exec(val)
    ])();
    if (!prop) {
      object[val] = true;
      return object;
    } else {
      object[prop[1]] = value[1];
      return object;
    }
  })
  .reduce((obj, item) => {
    let prop = Object.keys(item)[0];
    obj[prop] = item[prop];
    return obj;
  }, {});
