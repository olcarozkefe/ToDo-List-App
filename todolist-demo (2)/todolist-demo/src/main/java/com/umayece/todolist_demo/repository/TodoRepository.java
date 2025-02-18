package com.umayece.todolist_demo.repository;

import com.umayece.todolist_demo.model.Todo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUsername(String username);
}
