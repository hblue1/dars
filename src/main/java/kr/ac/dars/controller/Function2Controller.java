package kr.ac.dars.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Function2Controller {
    @RequestMapping(value = "/Function2")
    public String home(Model model)
    {
        return "Function2.html";
    }
}
