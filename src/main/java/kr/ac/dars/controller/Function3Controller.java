// package kr.ac.dars.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.ResponseBody;

// import kr.ac.dars.dto.Function3Dto;
// import kr.ac.dars.service.Function3Service;

// @Controller
// public class Function3Controller {
//     @Autowired
//     private Function3Service service;

//     @RequestMapping(value = "/Function3")
//     public String home(Model model)
//     {
//         service.connect();
//         return "Function3.html";
//     }

//     @PostMapping(value = "/Function3/getAudioFile")
//     @ResponseBody
//     public String getAudioFile(Function3Dto dto)
//     {
//         return service.getAudioFile(dto);
//     }

//     @PostMapping(value = "/Function3/disconnectSFTP")
//     @ResponseBody
//     public void disconnect(){
//         service.disconnection();
//     }
// }
