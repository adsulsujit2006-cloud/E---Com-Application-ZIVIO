package com.zivio.model;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class BusinessDetails {

    private String businessName;
    private String businessEmail;
    private String businessMobail;
    private String logo;
    private String businessAddress;
    private String banner;

}