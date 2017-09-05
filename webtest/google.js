const {Builder, By, until, Key} = require('selenium-webdriver');
const test = require('./testing');

// require('geckodriver');
const web_host = process.env.WEB_PORT_80_TCP_ADDR || '172.20.0.1';
const web_port = process.env.WEB_PORT_80_TCP_PORT || 8080;

const WEB_URL = `http://${web_host}:${web_port}/`;

console.log(WEB_URL);

const hub_host = process.env.HUB_PORT_4444_TCP_ADDR || '127.0.0.1';
const hub_port = process.env.HUB_PORT_4444_TCP_PORT || 4444;

const HUB_URL = `http://${hub_host}:${hub_port}/wd/hub`;

var caps = {
  browserName: 'firefox'
};

describe('todomvc app', function () {
  let driver = new Builder()
    .usingServer(HUB_URL)
    .withCapabilities(caps)
    .build();

  beforeEach(function setupWebdriver(done) {
    driver.get(WEB_URL)
      .then(() => done());
  });

  it('should be able to add a new task starting from empty on empty', function (done) {
    driver.findElement(By.css('.new-todo')).sendKeys('test task one', Key.RETURN)
      .then(_ => driver.wait(until.elementLocated(By.css('.todo-list>li label'))))
      .then(_ => driver.findElement(By.css('.todo-list>li .toggle')).click())
      .then(_ => driver.findElement(By.css('.clear-completed')).click())
      .then(() => done());
  });


  after(function quitWebdriver(done) {
    driver.quit()
    .then(() => done());
  });
});