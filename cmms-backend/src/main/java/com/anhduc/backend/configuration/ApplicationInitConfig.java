package com.anhduc.backend.configuration;


import com.anhduc.backend.entity.Role;
import com.anhduc.backend.entity.User;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.PermissionRepository;
import com.anhduc.backend.repository.RoleRepository;
import com.anhduc.backend.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            initializeRoles();
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                Role adminRole = roleRepository.findByName("SENIOR_MANAGEMENT")
                        .orElseThrow(() -> new AppException((ErrorCode.USER_ROLE_NOT_EXISTED)));
                User user = new User();
                user.setEmail("admin@gmail.com");
                user.setPassword(passwordEncoder.encode("admin"));
                user.setRole(adminRole);
                userRepository.save(user);
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
