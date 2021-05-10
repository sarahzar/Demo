package tn.esprit.esponline.api.DTO;

public class ResponseDto {

    private String succesMessage;
    private String errorMessage;

    public ResponseDto() {
    }

    public String getSuccesMessage() {
        return succesMessage;
    }

    public void setSuccesMessage(String succesMessage) {
        this.succesMessage = succesMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
