package kr.ac.dars.controller.function;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ac.dars.dto.function.Function3Dto;
import kr.ac.dars.service.function.Function3Service;

@Controller
public class Function3Controller {
    @Autowired
    private Function3Service service;

    @RequestMapping(value = "/function/Function3")
    public String home(Model model)
    {
        return "/function/Function3.html";
    }

    @PostMapping(value = "/function/Function3/getAudioInfo")
    @ResponseBody
    public List<Function3Dto> getAudioInfo(Function3Dto dto)
    {
        System.out.println(service.connect());
        return service.getAudioInfo(dto);
    }

    @PostMapping(value = "/function/Function3/getAudioFile")
    @ResponseBody
    public String getAudioFile(Function3Dto dto)
    {
        return service.getAudioFile(dto);
    }
}
