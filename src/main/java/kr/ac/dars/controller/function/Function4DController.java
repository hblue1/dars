package kr.ac.dars.controller.function;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Function4DController {
    @RequestMapping(value = "/function/Function4D")
    public String home(Model model)
    {
        return "function/Function4D.html";
    }
}
