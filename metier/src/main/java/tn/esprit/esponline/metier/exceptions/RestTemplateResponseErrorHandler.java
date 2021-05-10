package tn.esprit.esponline.metier.exceptions;

import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;

@Component
public class RestTemplateResponseErrorHandler implements ResponseErrorHandler {
    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        try {
            throw new InvalidUserCredentialsException("bad user credentials");
        } catch (InvalidUserCredentialsException e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
    return true;
    }



}
