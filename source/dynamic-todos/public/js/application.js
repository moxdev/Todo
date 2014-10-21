$(document).ready(function() {
  bindEvents();
});


function bindEvents() {
  // Bind functions which add, remove, and complete todos to the appropriate
  // elements
  $('#addTodo').on("click", addTodo);
  $('.todo_list').on("click", ".delete_todo", deleteTodo);

}

function addTodo(e){
  e.preventDefault();

  var addTodo = $('#todo_content').val();
  var $button = $(this);
  $button.prop("disabled", true);

  var serverRequest = $.ajax({
    url: '/add_todo',
    type: 'POST',
    data: {
      todo_content: addTodo
    },
  });
  serverRequest.done(function(data) {
    console.log(serverRequest);
    $('.todo_list ul').append(buildTodo(addTodo));
    $('#todo_content').val('');
    $button.prop("disabled", false);
  });
  serverRequest.fail(function() {
    console.log("Yo code is whack son");
  });
}

function deleteTodo(e){
  e.preventDefault();

  var deleteId = $(this).parent().data('id');
  var isDeleted = $(this).parent().remove();
  var ajaxRequest = $.ajax({
    url: '/delete_todo/' + deleteId,
    type: 'delete'
  });
}

function buildTodo(todoName) {
  // gets todoTemplate stored in DOM.
  var todoTemplate = $.trim($('#todo_template').html());

  // Creates an jQueryDOMElement from the todoTemplate.
  var $todo = $(todoTemplate);


  // Modifies it's text to use the passed in todoName.
  $todo.find('.todo_content').text(todoName);
  // Returns the jQueryDOMElement to be used elsewhere.

  return $todo;
}

//Create functions to add, remove and complete todos
