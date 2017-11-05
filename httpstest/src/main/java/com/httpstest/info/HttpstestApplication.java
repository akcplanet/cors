package com.httpstest.info;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.httpstest.info"})
public class HttpstestApplication {

	public static void main(String[] args) {
		SpringApplication.run(HttpstestApplication.class, args);
	}
}
