
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;

// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();
//
var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
//
// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();


// TEST FUNCTIONS
// siteVerification(driver_fx);
// newIdea(driver_fx);
// persistIdea(driver_fx);
// upVoteIdea(driver_fx);

siteVerification(driver_chr);
newIdea(driver_chr);
persistIdea(driver_chr);
upVoteIdea(driver_chr);
downVoteIdea(driver_chr);
deleteButton(driver_chr);

// siteVerification(driver_saf);
// newIdea(driver_saf);
// persistIdea(driver_saf);
// upVoteIdea(driver_saf);


function siteVerification(driver) {
  driver.get('https://anderswood.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('ideabox')).getText().then(function(siteName) {
    if(siteName === 'idea') {
      console.log('Site Verification Test passed');
    } else {
      console.log('Site Verification Test failed');
    }
  })

  // driver.quit();
}

function newIdea(driver) {
  driver.get('https://anderswood.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('title1');
  driver.findElement(By.id('content-input')).sendKeys('body1');
  driver.findElement(By.id('submit')).click();

    driver.sleep(5000).then(function() {
      driver.findElement(By.className('entry-title')).getText().then(function(title) {
        if(title === 'title1') {
          console.log('New Title Test passed');
        } else {
          console.log('New Title Test failed');
        }
      });

      driver.findElement(By.className('entry-body')).getText().then(function(title) {
        if(title === 'body1') {
          console.log('New Body Test passed');
        } else {
          console.log('New Body Test failed');
        }
      });


  });

  // driver.quit();
}

function persistIdea(driver) {
  driver.get('https://anderswood.github.io/2DoBox-Pivot/');
  driver.navigate().refresh();

    driver.sleep(1500).then(function() {
      driver.findElement(By.className('entry-title')).getText().then(function(title) {
        if(title === 'title1') {
          console.log('Persist Idea Test passed');
        } else {
          console.log('Persist Idea Test failed');
        }
      });
    })

  // driver.quit();
}

function upVoteIdea(driver) {
  driver.get('https://anderswood.github.io/2DoBox-Pivot/');
  driver.findElement(By.className('upvote')).click();

  driver.sleep(1500).then(function() {
    driver.findElement(By.className('quality')).getText().then(function(upVotedQual) {
      if(upVotedQual === 'plausible') {
        console.log('Upvote Test passed');
      } else {
        console.log('Upvote Test failed');
      }
    });
  })
}

function downVoteIdea(driver) {
  driver.get('https://anderswood.github.io/2DoBox-Pivot/');
  driver.findElement(By.className('upvote')).click();
  driver.findElement(By.className('upvote')).click();
  driver.findElement(By.className('downvote')).click();

  driver.sleep(1500).then(function() {
    driver.findElement(By.className('quality')).getText().then(function(upVotedQual) {
      if(upVotedQual === 'plausible') {
        console.log('Downvote Test passed');
      } else {
        console.log('Downvote Test failed');
      }
    });
  })
}

function deleteButton(driver) {
  driver.get('https://anderswood.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('title2');
  driver.findElement(By.id('content-input')).sendKeys('body2');
  driver.findElement(By.id('submit')).click();

    driver.sleep(5000).then(function() {
      driver.findElement(By.className('entry-title')).getText().then(function(title) {
        if(title === 'title2') {
          console.log('New Title2 Test passed');
        } else {
          console.log('New Title2 Test failed');
        }
      });

      driver.findElement(By.className('entry-body')).getText().then(function(title) {
        if(title === 'body2') {
          console.log('New Body2 Test passed');
        } else {
          console.log('New Body2 Test failed');
        }
      });

      driver.findElement(By.className('clear')).click();
      driver.sleep(5000).then(function() {
        driver.findElement(By.className('entry-title')).getText().then(function(title) {
          if(title === 'title2') {
            console.log('Delete Button Test failed');
          } else {
            console.log('Delete Button Test passed');
          }
        });
      });
  })
}
