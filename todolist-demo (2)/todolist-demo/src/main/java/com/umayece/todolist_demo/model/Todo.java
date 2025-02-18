package com.umayece.todolist_demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;


@Entity
@Table(name = "todo_app")
@Data
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;


    @Column(nullable = false)
    private boolean completed;

    private String username;

}