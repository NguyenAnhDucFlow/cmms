package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.MaterialCreationRequest;
import com.anhduc.backend.dto.response.MaterialResponse;
import com.anhduc.backend.entity.Material;
import com.anhduc.backend.repository.MaterialRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class MaterialService {

    MaterialRepository materialRepository;
    ModelMapper modelMapper;

    public MaterialResponse create(MaterialCreationRequest request) {
        Material material = modelMapper.map(request, Material.class);
        materialRepository.save(material);
        return modelMapper.map(material, MaterialResponse.class);
    }

}
