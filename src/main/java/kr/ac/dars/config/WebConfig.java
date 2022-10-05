// package kr.ac.dars.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {

	
//     // WebInterceptor 추가
// 	@Override
// 	public void addInterceptors(InterceptorRegistry registry) {
//     	// Interceptor 추가
// 		registry.addInterceptor(new WebHandler())
//         // 아래의 URL은 인터셉터 적용X
//         .excludePathPatterns("/css/**", "/fonts/**");
// 	}
	
// }