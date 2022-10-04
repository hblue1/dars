package kr.ac.dars.controller.function;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.function.Function1Dto;
import kr.ac.dars.service.function.Function1Service;

@Controller
public class Function1Controller {
    @Autowired
    private Function1Service service;

    @RequestMapping(value = "/function/Function1")
    public String home(Model model)
    {
        return "function/Function1.html";
    }

    @PostMapping(value = "/function/Function1/getAudioInfo")
    @ResponseBody
    public List<Function1Dto> getAudioInfo()
    {
        System.out.println(service.connect());
        return service.getAudioInfo();
    }   
}
