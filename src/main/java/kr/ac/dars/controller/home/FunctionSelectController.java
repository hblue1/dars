package kr.ac.dars.controller.home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ac.dars.config.UserLogComponet;

@Controller
public class FunctionSelectController {
    @Autowired
    private UserLogComponet ci;

    @RequestMapping(value = "/home/FunctionSelect")
    public String home(Model model)
    {
        System.out.println(ci.getIpAddr());
        System.out.println(ci.getTime());
        System.out.println(ci.getMemberId());
        return "/home/FunctionSelect.html";
    }
}
