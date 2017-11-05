package com.httptest.info;

import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
	    	 return new Greeting(counter.incrementAndGet(),
                     String.format(template, studentId));
	    }

	    
	    @PostMapping("/students/{studentId}/courses")
	    public @ResponseBody Greeting httpsCheck(@PathVariable String studentId, @RequestBody Greeting greeting) {
	    	 return new Greeting(counter.incrementAndGet(),
                     String.format(template, studentId));
	    }
	     
	    
}
