var data = [];

getCard();
printCard();

$("#title-input, #task-input").on("keyup", disableEnter);

$("#submit").on('click', function(e) {
  e.preventDefault();
  var storeCardTitle = $('#title-input').val();
  var storeCardContent = $('#task-input').val();
  var card = new Card(storeCardTitle, storeCardContent);
  data.unshift(card);
  storeCard();
  printCard();
  clearInput();
  disableEnter();
})

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
  editQuality(this, $importanceVar.text());
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
  editQuality(this, $importanceVar.text());
  console.log($importanceVar.text());
});

$('#card-section').on('blur', '.entry-title', function() {
  var newTitleText = $(this).text();
  editTitleText(this, newTitleText);
});

$('#card-section').on('blur', '.entry-body', function() {
  var newBodyText = $(this).text();
  editBodyText(this, newBodyText);
});


$("#card-section").on('click', '.delete', function() {
  var idOfRemoved = $(this).closest('.new-idea').attr('id');
  console.log(idOfRemoved);
  deleteCard(this, idOfRemoved);
  $(this).closest('.new-idea').remove();
});


$('#search').on('keyup', function() {
  var searchInput = $('#search').val();
  var re = new RegExp(searchInput, 'igm');
  $('.new-idea').each(function() {
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

$('.importance-radio-button').on('click', function() {
  var filterImportance = $(this).val();
  console.log(filterImportance);
  var filter = new RegExp(filterImportance, 'igm');
  $('.new-idea').each(function() {
    var taskImportance = $(this).find(".importance").text();
    var match = (taskImportance.match(filter));
    if (!match) {
      $(this).hide();
    } else {
      $(this).show();
    }
  })
})

$("#title-input, #task-input").on("keyup", disableEnter);

function Card(storeCardTitle, storeCardContent) {
    this.title = storeCardTitle;
    this.body = storeCardContent;
    this.importance = "None";
    this.id = Date.now();
}

function storeCard() {
    var stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}

function getCard() {
    var storedData = localStorage.getItem("Data Item") || '[]';
    var parsedData = JSON.parse(storedData);
    data = parsedData;
}

function printCard() {
  $("#card-section").html('');
  data.forEach(function(object) {
    $("#card-section").append(
      `<div id="${object.id}" class="new-idea">
				<header>
					<h1 class="entry-title" contenteditable='true'>${object.title}</h1>
					<button class="delete"></button>
				</header>
				<article>
					<p class='entry-body' contenteditable='true'>${object.body}</p>
					<button class="upvote"></button>
					<button class="downvote"></button>
					<h3>Importance:<h4 class="importance">${object.importance}</h4></h3>
				</article>
				<hr>
			</div>`
    );
  });
}

function clearInput() {
  $('#title-input').val('');
  $('#task-input').val('');
}

function disableEnter() {
  if ($("#title-input").val() == "" || $("#task-input").val() == "") {
    $("#submit").prop("disabled", true);
  } else {
    $("#submit").prop("disabled", false);
  }
}

function editQuality(location, importanceVar) {
  var objectId = $(location).closest('.new-idea').attr('id');
  data = JSON.parse(localStorage.getItem("Data Item"));
  data.forEach(function(object) {
    if (object.id == objectId) {
      object.importance = importanceVar;
    }
  });
  storeCard();
}

function editTitleText(location, newText) {
    var objectId = $(location).closest('.new-idea').attr('id');
    data = JSON.parse(localStorage.getItem('Data Item'));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.title = newText;
            return object.title;
        }
    });
    storeCard();
}

function editBodyText(location, newText) {
    var objectId = $(location).closest('.new-idea').attr('id');
    data = JSON.parse(localStorage.getItem('Data Item'));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.body = newText;
            return object.body;
        }
    });
    storeCard();
}

function deleteCard (location, idOfRemoved) {
    var objectId = $(location).closest('.new-idea').attr('id');
    var removedId = idOfRemoved;
    data = JSON.parse(localStorage.getItem("Data Item"));
    data = data.filter(function(object) {
        return object.id % objectId;
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}
