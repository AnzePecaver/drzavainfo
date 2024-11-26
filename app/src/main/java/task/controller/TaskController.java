package task.controller;

import lombok.extern.slf4j.Slf4j;
import task.dto.CountriesDTO;
import task.dto.CountryDTO;
import task.dto.CountryDetailsDTO;
import task.dto.IpInfoResponseDTO;
import task.dto.IpResponseDTO;
import lombok.val;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/task")
public class TaskController {

    private final RestTemplate restTemplate;
    private final ObjectMapper mapper;
    private final ClassPathResource countriesResource;

    public TaskController() {
        this.restTemplate = new RestTemplate();
        this.mapper = new ObjectMapper();
        this.countriesResource = new ClassPathResource("en-countries.json");
    }

    @GetMapping("/get-ip")
    public ResponseEntity<IpInfoResponseDTO> getCurrentIp() {
        val method = "getCurrentIp(): ";
        log.info(method + "Pridobivanje IP naslova.");

        try {
            
            String apiUrl = "https://api.ipify.org?format=json";

            IpResponseDTO ipResponse = restTemplate.getForObject(apiUrl, IpResponseDTO.class);

            if (ipResponse != null && ipResponse.getIp() != null) {
                String ip = ipResponse.getIp();
                LocalDateTime timestamp = LocalDateTime.now();

                log.info(method + "IP uspešno pridobljen: " + ip);
                return ResponseEntity.ok(new IpInfoResponseDTO(ip, timestamp));
            } else {
                log.error(method + "Napaka pri pridobivanju IP-ja.");
                return ResponseEntity.status(502).build();
            }
        } catch (Exception e) {
            log.error(method + "Napaka pri pridobivanju IP-ja: " + e.getMessage());
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/countries")
    public ResponseEntity<CountriesDTO> getCountries() {
        val method = "getCountries(): ";

        try {
            List<CountryDTO> countriesList = mapper.readValue(countriesResource.getInputStream(), new TypeReference<List<CountryDTO>>() {});
            CountriesDTO countries = new CountriesDTO();
            countries.setCountries(countriesList);

            return ResponseEntity.ok(countries);
        } catch (Exception e) {
            log.error(method + "Exception occurred while reading countries list: {}", e.getMessage());
            return ResponseEntity.status(500).build(); 
        }
    }

    @PostMapping("/countries")
    public ResponseEntity<CountryDetailsDTO> postCountries(@RequestBody CountryDTO entity) {
        val method = "postCountries(): ";

        String countryError = "";

        if(entity.getId() == 0) {
            countryError += "Manjka id";
        }
        if(entity.getAlpha2() == null) {
            countryError += "\nManjka alpha2";
        }
        if(entity.getAlpha3() == null) {
            countryError += "\nManjka alpha3";
        }
        if(entity.getName() == null) {
            countryError += "\nManjka name";
        }

        if(countryError.length() > 0) {
            log.error(method + "Podatki za drzavo so nepravilni ali manjkajoci", countryError);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        log.info(method + "Pridobljena izbrana drzava:");
        log.info(method + entity.toString());

        return ResponseEntity.ok(getCountryDetails(entity.getAlpha2()));

    }

    public CountryDetailsDTO getCountryDetails(String alpha) {
        String apiUrl = "https://restcountries.com/v3.1/alpha/" + alpha;
        CountryDetailsDTO[] countryDetailsResponse = restTemplate.getForObject(apiUrl, CountryDetailsDTO[].class);

        if (countryDetailsResponse != null && countryDetailsResponse.length > 0) {
            return countryDetailsResponse[0];
        } else {
            return null;
        }
    }

}
