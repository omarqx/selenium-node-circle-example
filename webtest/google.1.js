// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview An example test that may be run using Mocha.
 *
 * Usage:
 *
 *     mocha -t 10000 selenium-webdriver/example/google_search_test.js
 *
 * You can change which browser is started with the SELENIUM_BROWSER environment
 * variable:
 *
 *     SELENIUM_BROWSER=chrome \
 *         mocha -t 10000 selenium-webdriver/example/google_search_test.js
 */

const { Builder, By, Key, until } = require('selenium-webdriver');
const test = require('./testing');

const web_host = process.env.WEB_PORT_80_TCP_ADDR || '127.0.0.1';
const web_port = process.env.WEB_PORT_80_TCP_PORT || 8080;

const WEB_URL = `http://${web_host}:${web_port}/index.html`;

const hub_host = process.env.HUB_PORT_4444_TCP_ADDR || '127.0.0.1';
const hub_port = process.env.HUB_PORT_4444_TCP_PORT || 4444;

const HUB_URL = `http://${hub_host}:${hub_port}/wd/hub`;

var caps = {
  browserName: 'firefox'
};

test.describe('todomvc app', function () {
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

  // it('should be able to add a new task starting from empty on empty', function() {
  //   return driver.get('http://localhost:8080/')
  //       .then(_ =>
  //           driver.findElement(By.css('.new-todo')).sendKeys('test task two', Key.RETURN))
  //       .then(_ => {
  //           return driver.wait(until.elementLocated(By.css('.todo-list>li label')));
  //       });
  // });


  after(function quitWebdriver(done) {
    driver.quit()
    .then(() => done());
  });
});