package com.anhduc.backend.repository;

import com.anhduc.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    @Query("SELECT MAX(u.customerCode) FROM User u " +
            "WHERE u.customerCode LIKE :prefix%")
    String findMaxCustomerCodeWithPrefix(@Param("prefix") String prefix);

}
