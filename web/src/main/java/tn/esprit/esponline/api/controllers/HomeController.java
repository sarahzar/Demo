package tn.esprit.esponline.api.controllers;


import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class HomeController {

    @RequestMapping(value="/user", method= RequestMethod.GET)
    public String index(){
        return "Hello user";
    }

    @RequestMapping(value="/home", method= RequestMethod.GET)
    public String home(){
        return "Hello world";
    }

    @GetMapping(value = "/private")
    public String privateArea(){
        return "Private area";
    }

}
