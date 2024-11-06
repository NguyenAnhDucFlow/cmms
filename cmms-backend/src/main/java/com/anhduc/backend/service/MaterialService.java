package com.anhduc.backend.service;

import com.anhduc.backend.dto.MaterialDetailDTO;
import com.anhduc.backend.dto.MaterialFilterDTO;
import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.response.ListStoreMaterialResponse;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.entity.*;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
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
    UnitRepository unitRepository;
    StoreRepository storeRepository;
    StoreMaterialRepository storeMaterialRepository;

    public MaterialResponse create(MaterialCreationRequest request) throws IOException {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_EXISTED));
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_EXISTED));
        Unit basicUnit = unitRepository.findById(request.getBasicUnitId()).orElseThrow(
                () -> new AppException(ErrorCode.UNIT_NOT_EXISTED)
        );
        Material material = Material.builder()
                .name(request.getName())
                .barcode(request.getBarcode())
                .category(category)
                .brand(brand)
                .materialCode(request.getMaterialCode())
                .basicUnit(basicUnit)
                .costPrice(request.getCostPrice())
                .salePrice(request.getSalePrice())
                .isPoint(request.isPoint())
                .description(request.getDescription())
                .maxStock(request.getMaxStock())
                .minStock(request.getMinStock())
                .weightUnit(request.getWeightUnit())
                .weightValue(request.getWeightValue())
                .build();
        if (request.getMaterialUnitDtoList() != null && !request.getMaterialUnitDtoList().isEmpty()) {
            List<MaterialUnit> materialUnits = request.getMaterialUnitDtoList().stream().map(
                    materialUnitDto -> {
                        Unit unit = unitRepository.findById(materialUnitDto.getUnitId())
                                .orElseThrow(() -> new AppException(ErrorCode.UNIT_NOT_EXISTED));
                        return MaterialUnit.builder()
                                .unit(unit)
                                .material(material)
                                .conversionRate(materialUnitDto.getConversionRate())
                                .price(materialUnitDto.getPrice())
                                .build();
                    }
            ).toList();
            material.setMaterialUnits(materialUnits);
        }
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
        materialResponse.setCategoryName(material.getCategory().getName());
        return materialResponse;
    }

    public MaterialResponse update(MaterialCreationRequest request, UUID materialId, UUID storeId) throws IOException {
        Material material = materialRepository.findById(materialId).orElseThrow(
                () -> new AppException(ErrorCode.MATERIAL_NOT_FOUND)
        );
        material.setName(request.getName());
        material.setBarcode(request.getBarcode());
        material.setPoint(request.isPoint());
        material.setDescription(request.getDescription());
        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new AppException(ErrorCode.STORE_NOT_EXISTED)
        );
        StoreMaterial storeMaterial = new StoreMaterial();
        storeMaterial.setMaterial(material);
        storeMaterial.setStore(store);
        storeMaterial.setMinStock(request.getMinStock());
        storeMaterial.setMaxStock(request.getMaxStock());
        storeMaterialRepository.save(storeMaterial);


        if (request.getMaterialUnitDtoList() != null && !request.getMaterialUnitDtoList().isEmpty()) {
            List<MaterialUnit> materialUnits = request.getMaterialUnitDtoList().stream().map(
                    materialUnitDto -> {
                        Unit unit = unitRepository.findById(materialUnitDto.getUnitId())
                                .orElseThrow(() -> new AppException(ErrorCode.UNIT_NOT_EXISTED));
                        return MaterialUnit.builder()
                                .unit(unit)
                                .material(material)
                                .conversionRate(materialUnitDto.getConversionRate())
                                .price(materialUnitDto.getPrice())
                                .build();
                    }
            ).toList();
            material.setMaterialUnits(materialUnits);
        }
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
        materialRepository.save(material);
        MaterialResponse materialResponse = modelMapper.map(material, MaterialResponse.class);
        materialResponse.setBrandName(material.getBrand().getName());
        materialResponse.setCategoryName(material.getCategory().getName());
        return materialResponse;
    }

    public Page<ListStoreMaterialResponse> listMaterialsByCompanyWithFilters(MaterialFilterDTO filter) {
        PageRequest pageRequest = PageRequest.of(filter.getCurrentPage(), filter.getSize());
        return materialRepository.listMaterialsByCompanyWithFilters(filter, pageRequest);
    }

    public MaterialDetailDTO findMaterialDetailByStore(UUID materialId, UUID storeId) {
        Optional<StoreMaterial> storeMaterialOpt = storeMaterialRepository.findByMaterialIdAndStoreId(materialId, storeId);

        if (storeMaterialOpt.isPresent()) {
            StoreMaterial storeMaterial = storeMaterialOpt.get();
            Material material = storeMaterial.getMaterial();

            return new MaterialDetailDTO(
                    material.getId(),
                    material.getMaterialCode(),
                    material.getName(),
                    material.getCostPrice(),
                    material.getSalePrice(),
                    material.getImages(),
                    material.getWeightValue(),
                    material.getWeightUnit(),
                    material.getDescription(),
                    material.getCoverImageUrl(),
                    material.isPoint(),
                    material.getIsActive(),
                    material.getBasicUnit().getName(),
                    material.getCategory().getName(),
                    material.getBrand().getName(),
                    storeMaterial.getMinStock() >= 0 ? storeMaterial.getMinStock() : material.getMinStock(),
                    storeMaterial.getMaxStock() >= 0 ? storeMaterial.getMaxStock() : material.getMaxStock()
            );
        } else {
            Material material = materialRepository.findById(materialId)
                    .orElseThrow(() -> new AppException(ErrorCode.MATERIAL_NOT_FOUND));

            return new MaterialDetailDTO(
                    material.getId(),
                    material.getMaterialCode(),
                    material.getName(),
                    material.getCostPrice(),
                    material.getSalePrice(),
                    material.getImages(),
                    material.getWeightValue(),
                    material.getWeightUnit(),
                    material.getDescription(),
                    material.getCoverImageUrl(),
                    material.isPoint(),
                    material.getIsActive(),
                    material.getBasicUnit().getName(),
                    material.getCategory().getName(),
                    material.getBrand().getName(),
                    material.getMinStock(),
                    material.getMaxStock()
            );
        }
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
