package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.ProductCreationRequest;
import com.anhduc.backend.dto.response.ProductResponse;
import com.anhduc.backend.entity.Product;
import com.anhduc.backend.repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductService {

    ProductRepository productRepository;
    ModelMapper modelMapper;

    public ProductResponse create(ProductCreationRequest request) {
        Product product = modelMapper.map(request, Product.class);
        productRepository.save(product);
        return modelMapper.map(product, ProductResponse.class);
    }

}
