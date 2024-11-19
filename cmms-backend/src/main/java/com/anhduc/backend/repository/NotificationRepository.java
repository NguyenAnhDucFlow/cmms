package com.anhduc.backend.repository;

import com.anhduc.backend.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
}
