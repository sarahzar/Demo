package tn.esprit.esponline.persistence.repositories.jpaSpecifications;

public class SearchCriteria {

    private String key;
    private String secondKey;
    private String thirdKey;
    private Object value;
    private SearchOperation operation;


    public SearchCriteria(String key, Object value, SearchOperation operation) {
        this.key = key;
        this.value = value;
        this.operation = operation;
    }

    public SearchCriteria(String key, String secondKey, String thirdKey, Object value, SearchOperation operation) {
        this.key = key;
        this.secondKey = secondKey;
        this.thirdKey = thirdKey;
        this.value = value;
        this.operation = operation;
    }
    public SearchCriteria(String key, String secondKey, Object value, SearchOperation operation) {
        this.key = key;
        this.secondKey = secondKey;
        this.value = value;
        this.operation = operation;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public SearchOperation getOperation() {
        return operation;
    }

    public void setOperation(SearchOperation operation) {
        this.operation = operation;
    }

    public String getSecondKey() {
        return secondKey;
    }

    public void setSecondKey(String secondKey) {
        this.secondKey = secondKey;
    }

    public String getThirdKey() {
        return thirdKey;
    }

    public void setThirdKey(String thirdKey) {
        this.thirdKey = thirdKey;
    }
}
