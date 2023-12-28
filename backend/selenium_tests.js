import { Builder, By, Capabilities, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/firefox.js';

async function test1() {
   var driver = new Builder().
      withCapabilities(Capabilities.firefox()).
      setFirefoxOptions(new Options().headless()).
      build();

   
   let url1;
   let url2;
   let url3;
   await driver.get('http://localhost:3000/my_profile');
   driver.getCurrentUrl().then((url) => {url1 = url})
   await driver.get('http://localhost:3000/change_profile');
   driver.getCurrentUrl().then((url) => {url2 = url})
   await driver.get('http://localhost:3000/users_profile/2');
   driver.getCurrentUrl().then((url) => {url3 = url})
   await driver.get('http://localhost:3000/login');

   console.log(url1);
   console.log(url2);
   console.log(url3);
   if (url1 == url2 && url2 == url3 && url3 == "http://localhost:3000/login") {
      console.log("Тест 1 пройден успешно")
   } else {
      console.log("Тест 1 провален")
   }
   await driver.quit();
}

async function test2() {
   var driver = new Builder().
      withCapabilities(Capabilities.firefox()).
      setFirefoxOptions(new Options().headless()).
      build();

   
   await driver.get('http://localhost:3000/login');
   var login = await driver.findElement(By.className("log_login_input"));
   login.sendKeys("Pitersham@gmail.com");

   var password = await driver.findElement(By.className("log_password_input"));
   password.sendKeys("Petersham2004");

   var login_btn = await driver.findElement(By.className("login_btn"))
   login_btn.click();

   let url;
   await driver.wait(until.urlContains("/my_profile"), 2000).catch((err) => {console.log("Тест 2 провален")});
   url = await driver.getCurrentUrl();
   if (url == "http://localhost:3000/my_profile") {
      console.log("Тест 2 пройден успешно")
   } else {
      console.log("Тест 2 провален")
   }
   await driver.quit();
}

async function test3() {
   var driver = new Builder().
      withCapabilities(Capabilities.firefox()).
      setFirefoxOptions(new Options().headless()).
      build();

   
   await driver.get('http://localhost:3000/login');
   var login = await driver.findElement(By.className("log_login_input"));
   login.sendKeys("Pitersham@gmail.com");

   var password = await driver.findElement(By.className("log_password_input"));
   password.sendKeys("Petersham2004");

   var login_btn = await driver.findElement(By.className("login_btn"));
   login_btn.click();

   let url;
   await driver.wait(until.urlContains("/my_profile"), 2000).catch((err) => {console.log("Тест 3 провален")});
   var change_profile_btn = await driver.findElement(By.className("change_profile_btn"));
   change_profile_btn.click();

   await driver.wait(until.urlContains("/change_profile"), 2000).catch((err) => {console.log("Тест 3 провален")});
   var nickname = await driver.findElement(By.id("input_nickname"));
   await nickname.clear();
   nickname.sendKeys("nick");

   password = await driver.findElement(By.id("input_cur_pass"));
   password.sendKeys("Petersham2004");

   var avatar = await driver.findElement(By.id("input-file-upload"));
   avatar.sendKeys(process.cwd() + "\\avatars\\avatar.jpg")

   var save_btn = await driver.findElement(By.className("save_profile_btn"));
   save_btn.click();

   await driver.wait(until.elementIsVisible(await driver.findElement(By.id("saving"))), 4000).catch((err) => {console.log("Тест 3 провален")});

   await driver.get("http://localhost:3000/my_profile");

   await driver.wait(until.elementIsVisible(await driver.findElement(By.id("my_profile_name"))), 4000).catch((err) => {console.log("Тест 3 провален")});
   var nickname = await driver.findElement(By.id("my_profile_name"));
   if (await nickname.getText() == "nick") {
      console.log("Тест 3 пройден успешно");
   }

   await driver.quit();
}


await test1();
await test2();
await test3();