import { Builder, Capabilities } from 'selenium-webdriver';
 
var driver = new Builder().
   withCapabilities(Capabilities.firefox()).
   build();
 
driver.get('http://localhost:3000/my_profile');

// driver.quit();