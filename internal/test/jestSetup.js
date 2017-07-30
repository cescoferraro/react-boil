const enzyme = require('enzyme');
global.shallow = enzyme.shallow;
global.render = enzyme.render;
global.mount = enzyme.mount;
// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};
