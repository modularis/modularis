/* eslint-env node, mocha */
const Browser = require('zombie');

Browser.localhost('example.com', 2999);

describe('User visits homepage', () => {
  const browser = new Browser();

  before((done) => {
    browser.visit('', done);
  });

  it('should be successful', () => {
    browser.assert.success();
  });

  it('should see homepage', () => {
    browser.assert.text('title', 'modularis');
  });
});
