package com.anhduc.backend.service;

import com.anhduc.backend.repository.StoreMaterialRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StoreMaterialService {

    StoreMaterialRepository storeMaterialRepository;




}