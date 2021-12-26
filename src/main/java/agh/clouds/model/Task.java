package agh.clouds.model;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;


@Node
public class Task {

    @Id
    @GeneratedValue
    private Long id;

    private String description;

    private String date;

    @Relationship(type = "PART_OF", direction = Relationship.Direction.OUTGOING)
    private Category category;

    @Relationship(type = "TO_DO", direction = Relationship.Direction.INCOMING)
    private User user;

    public Task() {
    }

    public Task(String description, String date) {
        this.description = description;
        this.date = date;
    }

    public Task(String description, String date, Category category) {
        this.description = description;
        this.date = date;
        this.category = category;
    }

    public Task(String description, String date, Category category, User user) {
        this.description = description;
        this.date = date;
        this.category = category;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
