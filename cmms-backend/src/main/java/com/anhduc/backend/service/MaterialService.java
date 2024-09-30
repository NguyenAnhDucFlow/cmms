package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.entity.Category;
import com.anhduc.backend.entity.Material;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.BrandRepository;
import com.anhduc.backend.repository.CategoryRepository;
import com.anhduc.backend.repository.LocationRepository;
import com.anhduc.backend.repository.MaterialRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MaterialService {

    private static final AtomicLong ID_GENERATOR = new AtomicLong(1);

    MaterialRepository materialRepository;
    ModelMapper modelMapper;
    S3StorageService s3StorageService;
    CategoryRepository categoryRepository;
    BrandRepository brandRepository;
    LocationRepository locationRepository;

    public MaterialResponse create(MaterialCreationRequest request) throws IOException {
        Material material = modelMapper.map(request, Material.class);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        material.setCategory(category);
        material.setBrand(brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED)));
        material.setLocation(locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new AppException(ErrorCode.LOCATION_NOT_EXISTED)));
        List<String> images = new ArrayList<>();
        if (request.getImagesFile() != null && !request.getImagesFile().isEmpty()) {
            for (MultipartFile file : request.getImagesFile()) {
                String filename = file.getOriginalFilename();
                String extension = filename != null ? filename.substring(filename.lastIndexOf(".")) : null;
                String newFilename = UUID.randomUUID() + extension;
                String fileUrl = s3StorageService.uploadFile(newFilename, file);
                images.add(fileUrl);
                if (request.getCoverImageUrl() == null)
                    material.setCoverImageUrl(fileUrl);
            }
            material.setImages(images);
        }
        if (request.getMaterialCode() == null || request.getMaterialCode().isEmpty()) {
            material.setMaterialCode(generateMaterialCode(category.getName()));
        }
        materialRepository.save(material);
        MaterialResponse materialResponse = modelMapper.map(material, MaterialResponse.class);
        materialResponse.setBrandName(material.getBrand().getName());
        materialResponse.setLocationName(material.getLocation().getName());
        materialResponse.setCategoryName(material.getCategory().getName());
        return materialResponse;
    }


    //-------------------- PRIVATE METHOD ---------------------------------

    private String generateMaterialCode(String categoryName) {
        // Generate material code prefix from category name
        String[] words = categoryName.split(" ");
        String codePrefix = Arrays.stream(words)
                .map(word -> word.substring(0, 1).toUpperCase())
                .collect(Collectors.joining());

        // Attempt to generate a unique material code
        return generateUniqueMaterialCode(codePrefix);
    }

    private String generateUniqueMaterialCode(String codePrefix) {
        String materialCode;
        do {
            materialCode = codePrefix + ID_GENERATOR.getAndIncrement();
        } while (isMaterialCodeExists(materialCode));
        return materialCode;
    }

    private boolean isMaterialCodeExists(String materialCode) {
        return materialRepository.existsByMaterialCode(materialCode);
    }


}
