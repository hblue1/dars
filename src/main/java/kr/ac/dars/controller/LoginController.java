package kr.ac.dars.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// import kr.ac.dars.dto.LoginDto;
// import kr.ac.dars.service.LoginService;

@Controller
public class LoginController {
    // @Autowired
    // private LoginService service;

    @RequestMapping(value = "/")
    public String home(Model model) {
        return "Login.html";
    }

    // @PostMapping(value = "/login")
    // @ResponseBody
    // public boolean login(LoginDto dto){
    //     return service.login(dto);
    // }
}
