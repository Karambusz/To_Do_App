package agh.clouds.model;

public class TaskWithRelationship {

    private Long id;

    private String description;

    private String date;

    private String status;

    private String category;

    public TaskWithRelationship() {
    }

    public TaskWithRelationship(Long id, String description, String date, String status, String category) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.status = status;
        this.category = category;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
