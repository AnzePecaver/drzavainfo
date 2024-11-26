package task.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class IpInfoResponseDTO {
    private String ip;
    private LocalDateTime timestamp;
}
