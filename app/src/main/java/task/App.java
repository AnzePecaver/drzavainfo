
package task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(scanBasePackages = {"task"})
@EnableScheduling
public class App {

    public static void main(String[] args) {

            SpringApplication.run(App.class, args);
    }

    public String getGreeting() {
        return "Hello, World!";
    }
    
}
