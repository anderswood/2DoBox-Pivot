//To initate our tests, we must first include the selenium-webdriver module.
//We require the module and assign it to the variable "webdriver".
//We create a "By" and "until" shorthand variable for referencing the "By" class and "until" module
    //more easily within our subsequent code. "until" defines common conditions for use with "WebDriver wait".
//"By" describes a mechanism for locating an element on the page.

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//We instantiate a new instance of webdriver using its Builder function,
//and we assign that instance to a variable called "driver_fx" for Firefox.
// We then chain the instance method .forBrowser and pass it the argument 'firefox' to dictate browser type,
// and finally run the build() function to build the instance appropriately for Firefox.

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

//We instantiate a new instance of webdriver using its Builder function,
//and we assign that instance to a variable called "driver_chr" for Chrome.
// We then chain the instance method .forBrowser and pass it the argument 'chrome' to dictate browser type,
// and finally run the build() function to build the instance appropriately for Chrome.

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

//We instantiate a new instance of webdriver using its Builder function,
//and we assign that instance to a variable called "driver_saf" for Safari.
// We then chain the instance method .forBrowser and pass it the argument 'safari' to dictate browser type,
// and finally run the build() function to build the instance appropriately for Safari.

var driver_saf = new webdriver.Builder()
    .forBrowser('safari')
    .build();

//We run each browser instance through our searchTest function.

searchTest(driver_fx);
searchTest(driver_chr);
searchTest(driver_saf);

//Our searchTest function accepts a driver as an argument, and then runs selenium's .get method to access Google's main search url.
//It then finds an element on the page using the By class to search by attribute "name" with the value of "q".
//The resulting element is an input field, so we chain the .sendKeys method to have Selenium input "webdriver" as the search term.
//Following, we locate Google's submit search button via the By class again and name attribute, and chain the .click method to simulate user click.

function searchTest(driver) {
  driver.get('http://www.google.com');
  driver.findElement(By.name('q')).sendKeys('webdriver');
  driver.findElement(By.name('btnG')).click();

//Once we've simulated a user navigating to Google's search page, inputting search text, and then clicking the search button,
    //we have to buy ourselves a little time for the browser to return search results and then validate the result page.
//We use the sleep() method to delay 2 seconds (2000 miliseconds), and once that time passes, we chain a series of "step methods" with
    //javascript's .then() method to locate the title element on the Google results page and run a conditional to check
    //for the  title tag's value of 'webdriver - Google Search'. If it matches, the test passes, otherwise failure.

    driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'webdriver - Google Search') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

//After each searchTest set of statements run, we close the driver instance before exiting the function.
//This prevents multiple browser windows from cluttering up our environment.
  driver.quit();
}
