package agh.clouds.repository;

import agh.clouds.model.Task;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface  TaskRepository extends Neo4jRepository<Task, Long> {
    @Query("MATCH (u:User)-[:TO_DO]->(t:Task)-[cr]->(c:Category) where u.login=$userLogin RETURN t")
    List<Task> findToDoTasksForUser(String userLogin);

    @Query("MATCH (u:User)-[:DONE]->(t:Task)-[cr]->(c:Category) where u.login=$userLogin RETURN t")
    List<Task> findDoneTasksForUser(String userLogin);

    @Query("MATCH (u:User)-[r:TO_DO]->(t:Task) where u.login=$userLogin AND ID(t)=$taskId CREATE (u)-[r2:DONE]->(t) SET r2 = r WITH r DELETE r")
    void markTaskAsDone(String userLogin, Long taskId);
}
