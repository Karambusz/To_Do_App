package agh.clouds.repository;

import agh.clouds.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  UserRepository extends Neo4jRepository<User, Long> {
    Boolean existsByLogin(String login);
    User findByLogin(String login);
}
