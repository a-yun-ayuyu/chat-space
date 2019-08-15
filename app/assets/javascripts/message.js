$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="message__detail">
                    <p class="message__detail__current-user-name">
                      ${message.user_name}
                    </p>
                    <p class="message__detail__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message_body">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
  }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
  })
})
var reloadMessages = function () {
  if (window.location.href.match(/\/groups\/\d+\/messages/)){

    var last_message_id = $('.message').last().data('id');

    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {last_id: last_message_id},
    })
    .done(function (messages) {
      var insertHTML = '';        
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
      })
    })
    
    .fail(function() {
      alert('自動更新に失敗しました。');
    })
  } else {
    clearInterval(reloadMessages);
    
  }
}
$(function() {
  setInterval(reloadMessages, 5000);
});
});