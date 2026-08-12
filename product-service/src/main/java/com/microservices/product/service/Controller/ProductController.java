package com.microservices.product.service.Controller;

import com.microservices.product.service.dto.ProductRequest;
import com.microservices.product.service.dto.ProductResponse;
import com.microservices.product.service.model.Product;
import com.microservices.product.service.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {


    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest){
        return productService.createProduct(productRequest);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProucts(){
        return productService.getAllProdcuts();
    }

}
