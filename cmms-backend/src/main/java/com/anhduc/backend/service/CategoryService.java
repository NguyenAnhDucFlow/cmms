package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.CategoryCreationRequest;
import com.anhduc.backend.dto.response.CategoryCreationResponse;
import com.anhduc.backend.entity.Category;
import com.anhduc.backend.repository.CategoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CategoryService {

    CategoryRepository categoryRepository;
    ModelMapper modelMapper;

    public CategoryCreationResponse create(CategoryCreationRequest request) {
        Category category = modelMapper.map(request, Category.class);
        return modelMapper.map(categoryRepository.save(category), CategoryCreationResponse.class);
    }

    public List<CategoryCreationResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    public List<CategoryCreationResponse> search(String name) {
        return categoryRepository.searchCategoriesByName(name).stream()
                .map(this::convertToResponse)
                .toList();
    }

    private CategoryCreationResponse convertToResponse(Category category) {
        return modelMapper.map(category, CategoryCreationResponse.class);
    }

}
