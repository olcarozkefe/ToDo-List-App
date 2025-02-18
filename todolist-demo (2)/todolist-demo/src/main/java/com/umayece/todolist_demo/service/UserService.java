package com.umayece.todolist_demo.service;

import com.umayece.todolist_demo.dto.RegisterRequest;
import com.umayece.todolist_demo.model.User;
import com.umayece.todolist_demo.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = Optional.ofNullable(userRepository.findByUsername(username));

        return user.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public boolean registerUser(RegisterRequest userRequest) {
        // Kullanıcı zaten varsa false döndür
        if (userRepository.existsByUsername(userRequest.username())) {
            return false;
        }

        // Yeni bir kullanıcı oluştur
        User user = new User();
        user.setUsername(userRequest.username());
        user.setPassword(passwordEncoder.encode(userRequest.password()));
        user.setEmail(userRequest.email());

        userRepository.save(user); //  Kullanıcıyı veritabanına kaydet
        return true; //  Kullanıcı başarıyla kaydedildi
    }

    public User validateUser(String username, String password) {
        System.out.println("validateUser çağrıldı: " + username);

        Optional<User> userOptional = Optional.ofNullable(userRepository.findByUsername(username));

        if (userOptional.isEmpty()) {
            System.out.println("Kullanıcı bulunamadı: " + username);
            return null;
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("Şifre hatalı: " + username);
            return null;
        }

        System.out.println("Kullanıcı doğrulandı: " + username);
        return user;
    }
}
