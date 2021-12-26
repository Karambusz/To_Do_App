package agh.clouds.repository;

import agh.clouds.model.Category;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface  CategoryRepository extends Neo4jRepository<Category, Long> {
    Category findByName(String name);
    @Query("MATCH (t:Task)-[cr]->(c:Category) where id(t)=$taskId RETURN c")
    Category findCategoryByTaskId(Long taskId);
}
