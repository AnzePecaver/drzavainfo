package task.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CountryDetailsDTO {
    private Name name;
    private List<String> capital;
    private String region;
    private Double area;
    private Integer population;
    private Map<String, String> languages;
    private Map<String, Currency> currencies;
    private Flag flags;

    @Data
    public static class Flag {
        private String png;
    }

    @Data
    public static class Name {
        private String common;
        private String official;
    }

    @Data
    public static class Currency {
        private String name;
        private String symbol;
    }
}