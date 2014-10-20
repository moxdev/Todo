get '/' do
  @todos =Todo.all
  erb :index
end

post '/add_todo' do
  @todo = Todo.create(todo_content: params[:todo_content])
  content_type :json
  {:id => @todo.id.to_s}.to_json
end

post '/complete_todo/:id' do
  @todo = Todo.find(params[:id])
  @todo.update_attributes(completed: params[:completed])
end

delete '/delete_todo/:id' do
  @todo = Todo.find(params[:id])
  @todo.destroy
end


