package com.anhduc.backend.configuration;


import com.anhduc.backend.entity.Permission;
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
    PermissionRepository permissionRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            initializeRoles();
            if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
                Set<Role> roles = new HashSet<>();
                roles.add(roleRepository.findByName("Admin").orElseThrow(() -> new AppException(ErrorCode.USER_EXISTED)));
                User user = new User();
                user.setEmail("admin@gmail.com");
                user.setPassword(passwordEncoder.encode("admin"));
                user.setRoles(roles);
                userRepository.save(user);
            }
        };
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0 || permissionRepository.count() == 0) {
            log.info("Initializing Roles, permissions and default users.");
            Permission manageAccounts = new Permission();
            manageAccounts.setName("Manage Accounts");
            permissionRepository.save(manageAccounts);
            Role admin = new Role();
            admin.setName("Admin");
            admin.setPermissions(Set.of(manageAccounts));
            roleRepository.save(admin);
        }
    }
}
