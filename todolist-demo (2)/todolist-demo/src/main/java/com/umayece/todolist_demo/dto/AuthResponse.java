package com.umayece.todolist_demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

        private String token;
        private String message;

        public AuthResponse(String token, String message) {
            this.token = token;
            this.message = message;
        }

       /* // Getter metodları
        public String getToken() {
            return token;
        }

        public String getUsername() {
            return username;
        }*/
}
