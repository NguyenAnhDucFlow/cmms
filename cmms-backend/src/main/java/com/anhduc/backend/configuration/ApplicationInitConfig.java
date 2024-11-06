package com.anhduc.backend.configuration;

import com.anhduc.backend.entity.*;
import com.anhduc.backend.enums.RoleType;
import com.anhduc.backend.exception.AppException;
import com.anhduc.backend.exception.ErrorCode;
import com.anhduc.backend.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
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
    MaterialRepository materialRepository;
    UnitRepository unitRepository;
    CategoryRepository categoryRepository;
    BrandRepository brandRepository;

    @Bean
    ApplicationRunner applicationRunner() {
        return args -> {
            initializeRolesAndPermissions();
            initializeUsersAndStores();
            initializeMaterials();
        };
    }

    private void initializeRolesAndPermissions() {
        if (permissionRepository.findByName("READ_PRIVILEGE").isEmpty()) {
            Permission readPermission = new Permission();
            readPermission.setName("READ_PRIVILEGE");
            permissionRepository.save(readPermission);
        }

        if (permissionRepository.findByName("WRITE_PRIVILEGE").isEmpty()) {
            Permission writePermission = new Permission();
            writePermission.setName("WRITE_PRIVILEGE");
            permissionRepository.save(writePermission);
        }

        // Tạo các role với permission tương ứng
        if (roleRepository.findByName("SENIOR_MANAGEMENT").isEmpty()) {
            Role seniorManagement = new Role();
            seniorManagement.setName("SENIOR_MANAGEMENT");
            seniorManagement.setPermissions(Set.of(
                    permissionRepository.findByName("READ_PRIVILEGE").get(),
                    permissionRepository.findByName("WRITE_PRIVILEGE").get()
            ));
            roleRepository.save(seniorManagement);
        }

        if (roleRepository.findByName("STORE_MANAGER").isEmpty()) {
            Role storeManagerRole = new Role();
            storeManagerRole.setName("STORE_MANAGER");
            storeManagerRole.setPermissions(Set.of(
                    permissionRepository.findByName("READ_PRIVILEGE").get()
            ));
            roleRepository.save(storeManagerRole);
        }

        // Tiếp tục với các role khác
        // ...
    }

    private void initializeUsersAndStores() {
        // Tạo tài khoản admin
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(RoleType.SENIOR_MANAGEMENT.name())
                    .orElseThrow(() -> new AppException((ErrorCode.USER_ROLE_NOT_EXISTED)));
            roles.add(adminRole);
            User adminUser = new User();
            adminUser.setEmail("admin@gmail.com");
            adminUser.setRoles(roles);
            adminUser.setPassword(passwordEncoder.encode("admin"));
            userRepository.save(adminUser);
        }

        // Tạo tài khoản cho STORE_MANAGER
        if (userRepository.findByEmail("storemanager@gmail.com").isEmpty()) {
            Set<Role> roles = new HashSet<>();
            Role storeManagerRole = roleRepository.findByName("STORE_MANAGER")
                    .orElseThrow(() -> new AppException((ErrorCode.USER_ROLE_NOT_EXISTED)));
            roles.add(storeManagerRole);
            User storeManagerUser = new User();
            storeManagerUser.setEmail("storemanager@gmail.com");
            storeManagerUser.setRoles(roles);
            storeManagerUser.setPassword(passwordEncoder.encode("storemanager"));
            userRepository.save(storeManagerUser);
        }

        // Tạo tài khoản cho các role khác nếu cần
        // ...

        // Tạo cửa hàng mặc định
        if (storeRepository.findByName("Cửa hàng trung tâm").isEmpty()) {
            Store store = new Store();
            store.setName("Cửa hàng trung tâm");
            storeRepository.save(store);
        }
    }

    private void initializeMaterials() {
        if (materialRepository.count() == 0) {
            // Lấy các thực thể Unit, Category, Brand dựa vào tên
            Unit basicUnit = unitRepository.findByName("Đơn vị cơ bản")
                    .orElseGet(() -> {
                        Unit unit = new Unit();
                        unit.setName("Đơn vị cơ bảng");
                        return unitRepository.save(unit);
                    });
            Category defaultCategory = categoryRepository.findByName("Danh mục mặc định")
                    .orElseGet(() -> {
                        Category category = Category.builder()
                                .name("Danh mục mặc đinh").build();
                        return categoryRepository.save(category);
                    });
            Brand defaultBrand = brandRepository.findByName("Thương hiệu mặc định")
                    .orElseGet(() -> {
                        Brand brand = new Brand();
                        brand.setName("Brand mặc đinh");
                        return brandRepository.save(brand);
                    });

            // Khởi tạo danh sách 5 vật liệu
            Material material1 = Material.builder()
                    .materialCode("M001")
                    .barcode("123456789001")
                    .name("Cát xây dựng")
                    .costPrice(new BigDecimal("50"))
                    .salePrice(new BigDecimal("70"))
                    .images(List.of("url1", "url2"))
                    .weightValue(1.0f)
                    .weightUnit("kg")
                    .description("Cát xây dựng chất lượng cao")
                    .minStock(10)
                    .maxStock(100)
                    .coverImageUrl("cover_url1")
                    .isPoint(false)
                    .isActive(true)
                    .basicUnit(basicUnit)
                    .category(defaultCategory)
                    .brand(defaultBrand)
                    .build();

            // Tạo các vật liệu khác tương tự
            Material material2 = Material.builder()
                    .materialCode("M002")
                    .barcode("123456789002")
                    .name("Xi măng")
                    .costPrice(new BigDecimal("80"))
                    .salePrice(new BigDecimal("100"))
                    .images(List.of("url3", "url4"))
                    .weightValue(50.0f)
                    .weightUnit("kg")
                    .description("Xi măng dùng trong xây dựng")
                    .minStock(20)
                    .maxStock(200)
                    .coverImageUrl("cover_url2")
                    .isPoint(false)
                    .isActive(true)
                    .basicUnit(basicUnit)
                    .category(defaultCategory)
                    .brand(defaultBrand)
                    .build();

            // Tiếp tục khởi tạo các vật liệu khác như material3, material4, material5...

            // Lưu các vật liệu vào cơ sở dữ liệu
            materialRepository.saveAll(List.of(material1, material2));
        }
    }
}
