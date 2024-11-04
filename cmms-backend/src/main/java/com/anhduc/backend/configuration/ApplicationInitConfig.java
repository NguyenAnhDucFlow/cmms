package com.anhduc.backend.configuration;


import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.Store;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.PermissionRepository;
import com.anhduc.backend.repository.RoleRepository;
import com.anhduc.backend.repository.StoreRepository;
import com.anhduc.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RoleRepository roleRepository;
    StoreRepository storeRepository;
    PermissionRepository permissionRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            initializeRoles();
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                Set<Role> roles = new HashSet<>();
                Role adminRole = roleRepository.findByName("SENIOR_MANAGEMENT")
                        .orElseThrow(() -> new AppException((ErrorCode.USER_ROLE_NOT_EXISTED)));
                roles.add(adminRole);
                User user = new User();
                user.setEmail("admin@gmail.com");
                user.setRoles(roles);
                user.setPassword(passwordEncoder.encode("admin"));
                userRepository.save(user);
            }
            if (storeRepository.findByName("Cửa hàng trung tâm").isEmpty()) {
                Store store = new Store();
                store.setName("Cửa hàng trung tâm");
                storeRepository.save(store);
            }
        };
    }

    private void initializeRoles() {
        if (roleRepository.findByName("SENIOR_MANAGEMENT").isEmpty()) {
            Role seniorManagement = new Role();
            seniorManagement.setName("SENIOR_MANAGEMENT");
            roleRepository.save(seniorManagement);
        }

        if (roleRepository.findByName("STORE_MANAGER").isEmpty()) {
            Role storeManagerRole = new Role();
            storeManagerRole.setName("STORE_MANAGER");
            roleRepository.save(storeManagerRole);
        }

        if (roleRepository.findByName("SALES_STAFF").isEmpty()) {
            Role salesStaffRole = new Role();
            salesStaffRole.setName("SALES_STAFF");
            roleRepository.save(salesStaffRole);
        }

        if (roleRepository.findByName("WAREHOUSE_STAFF").isEmpty()) {
            Role warehouseStaffRole = new Role();
            warehouseStaffRole.setName("WAREHOUSE_STAFF");
            roleRepository.save(warehouseStaffRole);
        }

        if (roleRepository.findByName("CUSTOMER").isEmpty()) {
            Role customerRole = new Role();
            customerRole.setName("CUSTOMER");
            roleRepository.save(customerRole);
        }

    }
}
