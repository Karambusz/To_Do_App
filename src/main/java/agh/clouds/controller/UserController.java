package agh.clouds.controller;

import agh.clouds.model.User;
import agh.clouds.model.LoginUser;
import agh.clouds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        if (!userRepository.existsByLogin(user.getLogin())) {
            response.put("status", HttpStatus.OK.value());
            response.put("message", "Udało się!");
            userRepository.save(user);
            return ResponseEntity.ok(response);
        }

        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("message", "Użytkownik z takim loginem już istnieje");
        return ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/signin")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginUser loginUser) {
        Map<String, Object> response = new HashMap<>();
        if (userRepository.existsByLogin(loginUser.getLogin())) {
            User lUser = userRepository.findByLogin(loginUser.getLogin());
            if (lUser.getPassword().equals(loginUser.getPassword())) {
                response.put("status", HttpStatus.OK.value());
                response.put("user", lUser);
                return ResponseEntity.ok(response);
            } else {
                response.put("status", HttpStatus.BAD_REQUEST.value());
                response.put("message", "Proszę sprawdzić login oraz hasło.");
                return ResponseEntity.badRequest().body(response);
            }
        }
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("message", "Brak użytkownika w bazie danych, proszę sprawdzić swoje dane i spróbować jeszcze raz lub proszę założyć nowe konto");
        return ResponseEntity.badRequest().body(response);
    }
}
