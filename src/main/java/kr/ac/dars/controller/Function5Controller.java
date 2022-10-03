package kr.ac.dars.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.Function5Dto;
import kr.ac.dars.service.Function5Service;

@Controller
public class Function5Controller {
    @Autowired
    private Function5Service service;
    @RequestMapping(value = "/action/Function5")
    public String home(Model model)
    {
        return "Function5.html";
    }

    @PostMapping(value = "/action/Function5/loadFile")
    @ResponseBody
    public Function5Dto loadFile(Function5Dto dto)
    {
        System.out.println(service.connect());
        return service.loadFile(dto);
    }
}
