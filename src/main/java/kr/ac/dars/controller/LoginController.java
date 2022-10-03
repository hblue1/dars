package kr.ac.dars.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import kr.ac.dars.dto.UserDto;
import kr.ac.dars.service.UserService;
import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class LoginController {
    private final UserService userService;

    @GetMapping(value = "/login")
    public String login(HttpServletRequest request) {
        return "Login.html";
    }

    @GetMapping("/signUp")
	public String signUp(Model model) {
		model.addAttribute("userDto", new UserDto());
		return "signUp";
	}
 
	@PostMapping("/signUp")
	public String signUp(@ModelAttribute("userDto") UserDto userDto) {
		userService.insert(userDto);
		return "redirect:/login";
	}

    // @RequestMapping(value = "/login")
    // public String home(Model model) {
    //     return "Login.html";
    // }

    // @PostMapping(value = "/loginAttempt")
    // @ResponseBody
    // public boolean loginAttempt(LoginDto dto){
    //     return service.loginAttempt(dto);
    // }
}
