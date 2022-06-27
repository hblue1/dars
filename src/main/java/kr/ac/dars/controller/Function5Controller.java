package kr.ac.dars.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Function5Controller {
    @RequestMapping(value = "/Function5")
    public String home(Model model)
    {
        return "Function5.html";
    }
}
