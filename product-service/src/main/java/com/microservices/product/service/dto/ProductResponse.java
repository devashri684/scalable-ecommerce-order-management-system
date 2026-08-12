package com.microservices.product.service.dto;

import java.math.BigDecimal;

public record ProductResponse(String id, String name,String description, BigDecimal Price){
}
