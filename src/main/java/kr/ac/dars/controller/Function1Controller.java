package kr.ac.dars.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.Function1Dto;
import kr.ac.dars.service.Function1Service;

@Controller
public class Function1Controller {
    @Autowired
    private Function1Service service;

    @RequestMapping(value = "/action/Function1")
    public String home(Model model)
    {
        return "Function1.html";
    }

    @PostMapping(value = "/action/Function1/getAudioInfo")
    @ResponseBody
    public List<Function1Dto> getAudioInfo()
    {
        System.out.println(service.connect());
        return service.getAudioInfo();
    }
}
