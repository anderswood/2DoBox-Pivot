var taskArray = [];
var slicedTaskArray;
var displayedTasks = 10;

getCard();
printIncompleteCards();

$("#submit").on('click', function(e) {
  e.preventDefault();
  var storeCardTitle = $('#title-input').val();
  var storeCardContent = $('#task-input').val();
  var card = new Card(storeCardTitle, storeCardContent);
  taskArray.unshift(card);
  storeCard();
  printIncompleteCards();
  clearInput();
  disableEnter();
})

$('.show-complete').on('click', function() {
  sortArray();
  printAllCards();
})

$('.show-more-todos').on('click', function() {
  displayedTasks++;
  getCard();
  printIncompleteCards();
})

$('.importance-radio-button').on('click', function() {
  var filterImportance = $(this).val();
  console.log(filterImportance);
  var filter = new RegExp(filterImportance, 'igm');
  $('.new-task').each(function() {
    var taskImportance = $(this).find(".importance").text();
    var match = (taskImportance.match(filter));
    if (!match) {
      $(this).hide();
    } else {
      $(this).show();
    }
  })
})

$('#search').on('keyup', function() {
  var searchInput = $('#search').val();
  var re = new RegExp(searchInput, 'igm');
  $('.new-task').each(function() {
    var title = $(this).find(".entry-title").text();
    var body = $(this).find("article p").text();
    var match = (title.match(re) || body.match(re));
    if (!match) {
      $(this).hide();
    } else {
      $(this).show();
    }
  })
});

$("#card-section").on('click', '.upvote', function() {
  var $importanceVar = $(this).siblings(".importance");
  switch($importanceVar.text()){
    case 'None':
      $importanceVar.text('Low');
      break;
    case 'Low':
      $importanceVar.text('Normal');
      break;
    case 'Normal':
      $importanceVar.text('High');
      break;
    case 'High':
      $importanceVar.text('Critical');
      break;
    default:
      $importanceVar.text('Critical');
  }
  editImportance(this, $importanceVar.text());
  console.log($importanceVar.text());
});

$("#card-section").on('click', '.downvote', function() {
  var $importanceVar = $(this).siblings(".importance");
  switch($importanceVar.text()){
    case 'Critical':
      $importanceVar.text('High');
      break;
    case 'High':
      $importanceVar.text('Normal');
      break;
    case 'Normal':
      $importanceVar.text('Low');
      break;
    case 'Low':
      $importanceVar.text('None');
      break;
    default:
      $importanceVar.text('None');
  }
  editImportance(this, $importanceVar.text());
  console.log($importanceVar.text());
});

$("#card-section").on('click', '.delete', function() {
  var idOfRemoved = $(this).closest('.new-task').attr('id');
  console.log(idOfRemoved);
  deleteCard(this, idOfRemoved);
  $(this).closest('.new-task').remove();
});

$("#card-section").on('click', '.task-complete', function() {
  $(this).closest('.new-task').toggleClass('completed');
  var completeStatus = false
  if ($(this).closest('.new-task').hasClass('completed')) {
    completeStatus = true
  }
  editComplete(this,completeStatus);
})

$('#card-section').on('blur', '.entry-title', function() {
  var newTitleText = $(this).text();
  editTitleText(this, newTitleText);
});

$('#card-section').on('blur', '.entry-body', function() {
  var newBodyText = $(this).text();
  editBodyText(this, newBodyText);
});

function editComplete(location, completeStatus) {
  var objectId = $(location).closest('.new-task').attr('id');
  taskArray = JSON.parse(localStorage.getItem("Data Item"));
  taskArray.forEach(function(object) {
    if (object.id == objectId) {
      object.complete = completeStatus;
    }
  });
  storeCard();
}

function Card(storeCardTitle, storeCardContent) {
  this.title = storeCardTitle;
  this.body = storeCardContent;
  this.importance = "None";
  this.id = Date.now();
  this.complete = false;
}

function storeCard() {
  var stringData = JSON.stringify(taskArray);
  localStorage.setItem("Data Item", stringData);
}

function getCard() {
  var storedData = localStorage.getItem("Data Item") || '[]';
  var parsedData = JSON.parse(storedData);
  taskArray = parsedData;
}

function printAllCards() {
  $("#card-section").html('');
  slicedTaskArray = taskArray.slice(0,displayedTasks);
  slicedTaskArray.forEach(function(task) {
    var complete = ''
    if (task.complete) {
      complete = ' completed';
    }
    appendText(task, complete);
  });
}

function printIncompleteCards() {
  $("#card-section").html('');
  slicedTaskArray = taskArray.slice(0,displayedTasks);
  slicedTaskArray.forEach(function(task) {
    if (!task.complete) {
      appendText(task, '');
    }
  });
}

function sortArray() {
  taskArray.sort(function(task1,task2){
    if (task1.complete>task2.complete) {
      return -1;
    } if (task1.complete<task2.complete) {
      return 1;
    }
      return 0;
  })
}

function clearInput() {
  $('#title-input').val('');
  $('#task-input').val('');
}

function editImportance(location, importanceVar) {
  var objectId = $(location).closest('.new-task').attr('id');
  taskArray = JSON.parse(localStorage.getItem("Data Item"));
  taskArray.forEach(function(object) {
    if (object.id == objectId) {
      object.importance = importanceVar;
    }
  });
  storeCard();
}

function editTitleText(location, newText) {
  var objectId = $(location).closest('.new-task').attr('id');
  taskArray = JSON.parse(localStorage.getItem('Data Item'));
  taskArray.forEach(function(object) {
    if (object.id == objectId) {
      object.title = newText;
      return object.title;
    }
  });
  storeCard();
}

function editBodyText(location, newText) {
  var objectId = $(location).closest('.new-task').attr('id');
  taskArray = JSON.parse(localStorage.getItem('Data Item'));
  taskArray.forEach(function(object) {
    if (object.id == objectId) {
      object.body = newText;
      return object.body;
    }
  });
  storeCard();
}

function deleteCard (location, idOfRemoved) {
  var objectId = $(location).closest('.new-task').attr('id');
  var removedId = idOfRemoved;
  taskArray = JSON.parse(localStorage.getItem("Data Item"));
  taskArray = taskArray.filter(function(object) {
    return object.id % objectId;
  });
  stringData = JSON.stringify(taskArray);
  localStorage.setItem("Data Item", stringData);
}

function appendText(task, complete) {
  $("#card-section").append(
    `<div id="${task.id}" class="new-task${complete}">
    <header>
      <h1 class="entry-title" contenteditable='true'>${task.title}</h1>
      <button class="delete"></button>
    </header>
    <article>
      <p class='entry-body' contenteditable='true'>${task.body}</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <h3>Importance:<h4 class="importance">${task.importance}</h4></h3>
      <button class="task-complete">Completed</button>
    </article>
    <hr>
    </div>`
  );
}

$("#title-input, #task-input").on("keyup", disableEnter);

function disableEnter() {
  if ($("#title-input").val() == "" || $("#task-input").val() == "") {
    $("#submit").prop("disabled", true);
  } else {
    $("#submit").prop("disabled", false);
  }
}
