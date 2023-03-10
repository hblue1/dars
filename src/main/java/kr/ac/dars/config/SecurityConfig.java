package kr.ac.dars.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import kr.ac.dars.enums.security.UserRole;
import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig{
    private final UserDetailsService userDetailsService;

    @Bean
	public static BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

    @Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/favicon.ico", "/resources/**", "/error","/css/**", "/js/**", "/img/**");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/","/login","/signUp").permitAll() // 누구나 접근 허용
                //나중에 user권한 관련 부분 추가
                .antMatchers("/function/**","/home/**").hasAnyRole(UserRole.USER.toString(),UserRole.MANAGER.toString(),UserRole.SYSTEM.toString()) // USER, MANAGER, ADMIN만 접근 가능
                .antMatchers("/system/**").hasAnyRole(UserRole.MANAGER.toString(),UserRole.SYSTEM.toString()) // MANAGER, ADMIN만 접근 가능
                .anyRequest().authenticated() // 나머지 요청들은 권한의 종류에 상관 없이 권한이 있어야 접근 가능
                .and()
            .csrf()
                .ignoringAntMatchers("/function/**")
                .ignoringAntMatchers("/system/**")
                .and()
            .formLogin()
                .permitAll()
                .loginPage("/login") // 로그인 페이지 링크
                .defaultSuccessUrl("/home/FunctionSelect",true) // 로그인 성공 후 리다이렉트 주소
                .and()
            .logout()
                .permitAll()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .deleteCookies("JSESSIONID")
                .logoutSuccessUrl("/login") // 로그아웃 성공시 리다이렉트 주소
                .invalidateHttpSession(true) // 세션 날리기
                .clearAuthentication(true)
                .and()
            .exceptionHandling()
                .accessDeniedPage("/AccessDenied")
                .and()
            .sessionManagement()
                .maximumSessions(1) //최대 세션 개수지정
                .maxSessionsPreventsLogin(false) //false 일경우 먼저 접속한 사용자 LogOut 처리
                .expiredUrl("/login?expire=true"); // 만료시 이동 페이지

        http.headers().frameOptions().sameOrigin();

        return http.build();
    }
}
