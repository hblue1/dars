package kr.ac.dars.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Function1Controller {
    @RequestMapping(value = "/Function1")
    public String home(Model model)
    {
        return "Function1.html";
    }
}
