package task.dto;

import lombok.Data;

@Data
public class CountryDTO {
    private int id;
    private String alpha2;
    private String alpha3;
    private String name;
}
