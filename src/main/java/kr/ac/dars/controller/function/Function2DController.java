package kr.ac.dars.controller.function;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Function2DController {
    @RequestMapping(value = "/function/Function2D")
    public String home(Model model)
    {
        return "function/Function2D.html";
    }
}
