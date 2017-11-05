package com.httptest.info;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.web.WebApplicationInitializer;

public class ServletInitializer extends SpringBootServletInitializer implements WebApplicationInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TesthttpApplication.class);
	}
	
/*	 private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder) {
	        return builder.sources(ServletInitializer.class).bannerMode(Banner.Mode.OFF);
	    }
*/
}
