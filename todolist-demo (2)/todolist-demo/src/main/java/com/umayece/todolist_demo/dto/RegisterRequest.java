package com.umayece.todolist_demo.dto;

public record  RegisterRequest (
        String username,
        String email,
        String password
){
}
