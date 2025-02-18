package com.umayece.todolist_demo.controller;
import org.springframework.security.access.prepost.PreAuthorize;

import com.umayece.todolist_demo.model.Todo;
import com.umayece.todolist_demo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/user")
    public ResponseEntity<List<Todo>> getTodosForUser(@RequestParam String username) {
        List<Todo> todos = todoService.getTodosByUsername(username);
        return ResponseEntity.ok(todos);
    }

    @PreAuthorize("isAuthenticated()") //  Sadece giriş yapmış kullanıcılar erişebilir!
    @PostMapping("/add")
    public ResponseEntity<Todo> addTodo(@RequestBody Todo todo, @AuthenticationPrincipal UserDetails userDetails) {
        // Kullanıcı adını ekleyerek güvenli hale getiriyoruz
        todo.setUsername(userDetails.getUsername());
        Todo savedTodo = todoService.createTodo(todo);
        return ResponseEntity.ok(savedTodo);
    }

    @GetMapping()
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id);
    }


    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.updateTodo(id, todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
}