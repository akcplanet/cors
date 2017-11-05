package com.httpstest.info;

import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/test")
public class AppMainController {
	
	
	  public static final Logger logger = LoggerFactory.getLogger(AppMainController.class);
	
	 private static final String template = "Hello, %s!";
	    private final AtomicLong counter = new AtomicLong();

	    @RequestMapping("/greeting")
	    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
	        return new Greeting(counter.incrementAndGet(),
	                            String.format(template, name));
	    }
	    
	    @GetMapping("/students/{studentId}/courses")
	    public Greeting httpsCheck(@PathVariable String studentId) {
	    	HttpHeaders headers = new HttpHeaders();
	    	headers.setContentType(MediaType.APPLICATION_JSON);
	    	headers.set("Authorization", "Bearer "+accessToken);
	    	RestTemplate restTemplate = new RestTemplate();
	    	String fooResourceUrl= "http://localhost:8080/test/students/test543amit/courses";
	    	Greeting response= null;
	    	try{
	    	 response = restTemplate.getForObject(fooResourceUrl , Greeting.class);
	    	System.out.println(response);
	    	}catch(Exception ex){
	    		System.out.println(ex);
	    	}
	    	 return response;
	    }

	    
	    @PostMapping("/students/{studentId}/courses")
	    public @ResponseBody Greeting httpsCheck(@PathVariable String studentId, @RequestBody Greeting greeting) {
	    	RestTemplate restTemplate = new RestTemplate();
	    	String fooResourceUrl= "http://localhost:8080/test/students/test543amit/courses";
	    	Greeting response= null;
	    	try{
	    	 response = restTemplate.postForObject(fooResourceUrl , greeting,Greeting.class);
	    	System.out.println(response);
	    	}catch(Exception ex){
	    		System.out.println(ex);
	    	}
	    	 return response;
	    }

}
