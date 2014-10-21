get '/' do
  @todos =Todo.all
  erb :index
end

post '/add_todo' do
  @todo = Todo.create(todo_content: params[:todo_content])
  content_type :json
  {:id => @todo.id, todo_content: @todo.todo_content}.to_json
end

post '/complete_todo/' do
  @todo = Todo.find(params[:id]).complete = true
  content_type :json
  {id: params[:id]}.to_json
end

delete '/delete_todo/' do
  @todo = Todo.find(params[:id])
  @todo.destroy
end


