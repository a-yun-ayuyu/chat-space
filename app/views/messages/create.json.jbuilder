json.content   @message.body
json.image     @message.image.url
json.user_name @message.user.name
json.date      @message.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.id        @message.id