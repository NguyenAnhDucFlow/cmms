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
                Role adminRole = roleRepository.findByName("Senior Management")
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
        if (roleRepository.findByName("Senior Management").isEmpty()) {
            Role seniorManagement = new Role();
            seniorManagement.setName("Senior Management");
            roleRepository.save(seniorManagement);
        }

        if (roleRepository.findByName("Store Manager").isEmpty()) {
            Role storeManagerRole = new Role();
            storeManagerRole.setName("Store Manager");
            roleRepository.save(storeManagerRole);
        }

        if (roleRepository.findByName("Sales Staff").isEmpty()) {
            Role salesStaffRole = new Role();
            salesStaffRole.setName("Sales Staff");
            roleRepository.save(salesStaffRole);
        }

        if (roleRepository.findByName("Warehouse Staff").isEmpty()) {
            Role warehouseStaffRole = new Role();
            warehouseStaffRole.setName("Warehouse Staff");
            roleRepository.save(warehouseStaffRole);
        }

        if (roleRepository.findByName("Customer").isEmpty()) {
            Role customerRole = new Role();
            customerRole.setName("Customer");
            roleRepository.save(customerRole);
        }

    }
}
