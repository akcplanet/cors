package com.httptest.info;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.httptest.info"})
public class TesthttpApplication {

	public static void main(String[] args) {
		SpringApplication.run(TesthttpApplication.class, args);
	}
}
