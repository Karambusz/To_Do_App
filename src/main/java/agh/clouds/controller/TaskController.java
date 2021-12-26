package agh.clouds.controller;

import agh.clouds.model.Category;
import agh.clouds.model.Task;
import agh.clouds.model.TaskWithRelationship;
import agh.clouds.model.User;
import agh.clouds.repository.CategoryRepository;
import agh.clouds.repository.TaskRepository;
import agh.clouds.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/task/{userLogin}")
    public ResponseEntity<Map<String, Object>> createTask(@RequestBody Task task, @PathVariable String userLogin) {
        User user = userRepository.findByLogin(userLogin);
        Category partOf = categoryRepository.findByName(task.getCategory().getName());
        Task taskToAdd = new Task(task.getDescription(), task.getDate(), partOf, user);

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Task został dodany do listy!");

        taskRepository.save(taskToAdd);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/task/{userLogin}")
    public List<TaskWithRelationship> createTask(@PathVariable String userLogin) {
        List<Task> toDoTasks =  taskRepository.findToDoTasksForUser(userLogin);
        List<Task> doneTasks =  taskRepository.findDoneTasksForUser(userLogin);

        List<TaskWithRelationship> toDoTasksWithRelationships = toDoTasks.stream()
                .map(task -> {
                    String categoryName = categoryRepository.findCategoryByTaskId(task.getId()).getName();
                    return new TaskWithRelationship(task.getId(), task.getDescription(), task.getDate(), "TO_DO", categoryName);
                }).collect(Collectors.toList());

        List<TaskWithRelationship> doneTasksWithRelationships = doneTasks.stream()
                .map(task -> {
                    String categoryName = categoryRepository.findCategoryByTaskId(task.getId()).getName();
                    return new TaskWithRelationship(task.getId(), task.getDescription(), task.getDate(), "DONE", categoryName);
                }).collect(Collectors.toList());


        List<TaskWithRelationship> merge = new ArrayList<>();
        merge.addAll(toDoTasksWithRelationships);
        merge.addAll(doneTasksWithRelationships);

        return merge;
    }

    @DeleteMapping("/task/{taskId}")
    public ResponseEntity<Map<String, Object>>  deleteTask(@PathVariable Long taskId) {
        taskRepository.deleteById(taskId);

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Task został usunięty");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/task/{userLogin}/{taskId}")
    public ResponseEntity<Map<String, Object>>  markTaskAsDone(@PathVariable String userLogin, @PathVariable Long taskId) {
        taskRepository.markTaskAsDone(userLogin, taskId);

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.OK.value());
        response.put("message", "Relacja została zmieniona na DONE");

        return ResponseEntity.ok(response);
    }


}
