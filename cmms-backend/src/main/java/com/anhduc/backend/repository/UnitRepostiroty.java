package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UnitRepostiroty extends JpaRepository<Unit, UUID> {
}
