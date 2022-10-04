package kr.ac.dars.controller.function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.function.Function5Dto;
import kr.ac.dars.service.function.Function5Service;

@Controller
public class Function5Controller {
    @Autowired
    private Function5Service service;
    @RequestMapping(value = "/function/Function5")
    public String home(Model model)
    {
        return "function/Function5.html";
    }

    @PostMapping(value = "/function/Function5/loadFile")
    @ResponseBody
    public Function5Dto loadFile(Function5Dto dto)
    {
        System.out.println(service.connect());
        return service.loadFile(dto);
    }
}
