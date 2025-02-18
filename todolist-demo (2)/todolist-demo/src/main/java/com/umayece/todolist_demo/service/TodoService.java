package com.umayece.todolist_demo.service;

import com.umayece.todolist_demo.model.Todo;
import com.umayece.todolist_demo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.net.http.HttpClient;
import java.util.List;
import java.util.Observable;

@Service

public class TodoService {


    private final TodoRepository todoRepository;

    public List<Todo> getTodosByUserName(String username) {
        return todoRepository.findByUsername(username);
    }

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo todo = getTodoById(id);
        todo.setTitle(updatedTodo.getTitle());
//        todo.setDescription(updatedTodo.getDescription());
        todo.setCompleted(updatedTodo.isCompleted());
        return todoRepository.save(todo);
    }

//    public void deleteTodoById(Long id) {
//        todoRepository.deleteById(id);
//    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    public List<Todo> getTodosByUsername(String username) {

        return todoRepository.findByUsername(username);
}
}
