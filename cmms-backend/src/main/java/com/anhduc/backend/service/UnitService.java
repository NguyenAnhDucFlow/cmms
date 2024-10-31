package com.anhduc.backend.service;

import com.anhduc.backend.dto.request.UnitCreationRequest;
import com.anhduc.backend.dto.response.UnitCreationResponse;
import com.anhduc.backend.entity.Unit;
import com.anhduc.backend.repository.UnitRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UnitService {

    UnitRepository unitRepository;
    ModelMapper modelMapper;

    public UnitCreationResponse create(UnitCreationRequest request) {
        Unit unit = modelMapper.map(request, Unit.class);
        return modelMapper.map(unitRepository.save(unit), UnitCreationResponse.class);
    }

    public List<UnitCreationResponse> findAll() {
        return unitRepository.findAll().stream()
                .map(this::convertToResponse)
                .toList();
    }

    private UnitCreationResponse convertToResponse(Unit unit) {
        return modelMapper.map(unit, UnitCreationResponse.class);
    }

}
