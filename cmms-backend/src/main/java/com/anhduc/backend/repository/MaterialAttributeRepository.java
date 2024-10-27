package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MaterialAttributeRepository extends JpaRepository<Attribute, UUID> {
}
