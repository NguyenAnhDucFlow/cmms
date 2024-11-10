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
        if (storeRepository.findByName("Cửa hàng quận 1").isEmpty()) {
            Store store = new Store();
            store.setName("Cửa hàng quận 1");
            storeRepository.save(store);
        }
        if (storeRepository.findByName("Cửa hàng quận 2").isEmpty()) {
            Store store = new Store();
            store.setName("Cửa hàng quận 2");
            storeRepository.save(store);
        }
    }

    private void initializeMaterials() {
        if (materialRepository.count() == 0) {

            List<String> unitNames = List.of(
                    "Bao",   // Bao xi măng
                    "Kg",    // Kilogram cho các vật liệu nhỏ lẻ
                    "Tấn",   // Tấn cho các vật liệu nặng
                    "Viên",  // Viên gạch
                    "M3",    // Mét khối cho cát, đá
                    "Lít",   // Lít cho sơn
                    "Cuộn",  // Cuộn cho thép hoặc ống nước
                    "Cây",   // Cây cho thép cây
                    "Mét",   // Mét cho ống nước hoặc kính
                    "Bộ"     // Bộ cho các thiết bị vệ sinh
            );

            List<Unit> units = unitNames.stream()
                    .map(name -> unitRepository.findByName(name)
                            .orElseGet(() -> {
                                Unit unit = new Unit();
                                unit.setName(name);
                                return unitRepository.save(unit);
                            })
                    )
                    .toList();

            // Tạo 10 danh mục vật liệu xây dựng
            List<String> categoryNames = List.of(
                    "Gạch", "Xi măng", "Cát", "Đá", "Thép", "Sơn", "Vữa", "Ống nước", "Thiết bị vệ sinh", "Kính"
            );
            List<Category> categories = categoryNames.stream()
                    .map(name -> categoryRepository.findByName(name)
                            .orElseGet(() -> {
                                Category category = Category.builder()
                                        .name(name)
                                        .build();
                                return categoryRepository.save(category);
                            })
                    )
                    .toList();

// Tạo 10 thương hiệu vật liệu xây dựng
            List<String> brandNames = List.of(
                    "Holcim", "SCG", "Cemex", "Lafarge", "VICEM",
                    "Fico", "Hà Tiên", "Insee", "Thạch Bàn", "Hoa Sen"
            );
            List<Brand> brands = brandNames.stream()
                    .map(name -> brandRepository.findByName(name)
                            .orElseGet(() -> {
                                Brand brand = new Brand();
                                brand.setName(name);
                                return brandRepository.save(brand);
                            })
                    )
                    .toList();



            List<Material> materials = List.of(
                    Material.builder()
                            .materialCode("SP0001")
                            .barcode("123456789001")
                            .name("Cát xây dựng")
                            .costPrice(new BigDecimal("50"))
                            .salePrice(new BigDecimal("70"))
                            .images(List.of("https://www.utihouse.com/wp-content/uploads/2018/03/Cat-1024x768.jpg", "https://bizweb.dktcdn.net/100/369/827/files/0-seezgwvk9cglo3wg.jpg?v=1602754440331"))
                            .weightValue(1.0f)
                            .weightUnit("kg")
                            .description("Cát xây dựng chất lượng cao")
                            .minStock(20)
                            .maxStock(200)
                            .coverImageUrl("https://static-4.happynest.vn/storage/uploads/2020/05/122ef9b4077fb73b69b0ce87b71a5cf5.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Kg").orElse(null))
                            .category(categoryRepository.findByName("Cát").orElse(null))
                            .brand(brandRepository.findByName("Holcim").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0002")
                            .barcode("123456789002")
                            .name("Xi măng PCB40")
                            .costPrice(new BigDecimal("75"))
                            .salePrice(new BigDecimal("95"))
                            .images(List.of("https://vatlieuxaydungsymanh.com/wp-content/uploads/2020/09/xi-mang-bao-nhieu-kg.png", "https://vatlieuxaydungsymanh.com/wp-content/uploads/2020/10/unnamed-2.png"))
                            .weightValue(50.0f)
                            .weightUnit("Bao")
                            .description("Xi măng chất lượng cao PCB40")
                            .minStock(30)
                            .maxStock(300)
                            .coverImageUrl("https://vatlieuxaydungsymanh.com/wp-content/uploads/2020/10/xi-mang-PCB40-1.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Bao").orElse(null))
                            .category(categoryRepository.findByName("Xi măng").orElse(null))
                            .brand(brandRepository.findByName("SCG").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0003")
                            .barcode("123456789003")
                            .name("Gạch đỏ xây dựng")
                            .costPrice(new BigDecimal("3"))
                            .salePrice(new BigDecimal("5"))
                            .images(List.of(
                                    "https://xaydungso.vn/webroot/img/images/2(65).jpg",
                                    "https://tse1.mm.bing.net/th?id=OIP.T0khP45LrU-4UzCDqiTKhQHaFj&pid=Api"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Viên")
                            .description("Gạch đỏ dùng cho xây dựng, độ bền cao")
                            .minStock(500)
                            .maxStock(5000)
                            .coverImageUrl("https://xaydungso.vn/webroot/img/images/gach-xay-dung.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Viên").orElse(null))
                            .category(categoryRepository.findByName("Gạch").orElse(null))
                            .brand(brandRepository.findByName("Thạch Bàn").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0004")
                            .barcode("123456789004")
                            .name("Thép cây phi 16")
                            .costPrice(new BigDecimal("120"))
                            .salePrice(new BigDecimal("150"))
                            .images(List.of(
                                    "https://theptriviet.com.vn/wp-content/uploads/2022/10/sat-phi-16-2.jpg",
                                    "https://theptriviet.com.vn/wp-content/uploads/2022/10/sat-phi-16-3.jpg"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Cây")
                            .description("Thép cây phi 16 chịu lực tốt, độ bền cao")
                            .minStock(50)
                            .maxStock(500)
                            .coverImageUrl("https://theptriviet.com.vn/wp-content/uploads/2022/10/sat-phi-16-1.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Cây").orElse(null))
                            .category(categoryRepository.findByName("Thép").orElse(null))
                            .brand(brandRepository.findByName("Hoa Sen").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0005")
                            .barcode("123456789005")
                            .name("Cát san lấp")
                            .costPrice(new BigDecimal("30"))
                            .salePrice(new BigDecimal("50"))
                            .images(List.of(
                                    "https://dungphatdat.vn/wp-content/uploads/2022/01/cat2.jpg",
                                    "https://static1.cafeland.vn/cafelandnew/hinh-anh/2020/09/09/95/image-20200909141842-1.png"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("M3")
                            .description("Cát san lấp dùng cho các công trình nền móng")
                            .minStock(20)
                            .maxStock(200)
                            .coverImageUrl("https://muabanvatlieuxaydung.com/upload/post/16/22/59/tim-hieu-ve-cat-san-lap-20210602092949-179022.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("M3").orElse(null))
                            .category(categoryRepository.findByName("Cát").orElse(null))
                            .brand(brandRepository.findByName("Fico").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0006")
                            .barcode("123456789006")
                            .name("Ống nước nhựa PVC D25")
                            .costPrice(new BigDecimal("10"))
                            .salePrice(new BigDecimal("15"))
                            .images(List.of(
                                    "https://reemart.vn/upload/sanpham/ong-dien-1529391799.png",
                                    "https://thietbidienlegrand.com/wp-content/uploads/2017/12/ong-dien-PVC-legrand.jpg"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Mét")
                            .description("Ống nước nhựa PVC D25 chịu lực tốt")
                            .minStock(100)
                            .maxStock(1000)
                            .coverImageUrl("https://vattudiennuoc247.com/wp-content/uploads/2022/07/Ong-nhua-pvc-d25-SP-luon-day-dien-chong-chay.png")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Mét").orElse(null))
                            .category(categoryRepository.findByName("Ống nước").orElse(null))
                            .brand(brandRepository.findByName("Hoa Sen").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0007")
                            .barcode("123456789007")
                            .name("Kính cường lực 8mm")
                            .costPrice(new BigDecimal("150"))
                            .salePrice(new BigDecimal("200"))
                            .images(List.of(
                                    "https://havaco.vn/wp-content/uploads/mai-kinh-cap-treo-chan-nhen-spider.jpg",
                                    "https://havaco.vn/wp-content/uploads/lan-can-ban-cong.jpg"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Mét")
                            .description("Kính cường lực dày 8mm an toàn, chịu lực tốt")
                            .minStock(10)
                            .maxStock(100)
                            .coverImageUrl("https://tapdoankinhvietlong.vn/wp-content/uploads/2022/06/kinh-cuong-luc-3.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Mét").orElse(null))
                            .category(categoryRepository.findByName("Kính").orElse(null))
                            .brand(brandRepository.findByName("Thạch Bàn").orElse(null))
                            .build(),
                    Material.builder()
                            .materialCode("SP0008")
                            .barcode("123456789008")
                            .name("Xi măng trắng")
                            .costPrice(new BigDecimal("80"))
                            .salePrice(new BigDecimal("100"))
                            .images(List.of(
                                    "https://tse3.mm.bing.net/th?id=OIP.CkaWQqSUZDH-yvAbebXEnwHaC8&pid=Api&P=0&h=220",
                                    "https://tse3.mm.bing.net/th?id=OIP.0bJDzCN4wTxqSwuEnLSHSgHaD9&pid=Api&P=0&h=220"
                            ))
                            .weightValue(40.0f)
                            .weightUnit("Bao")
                            .description("Xi măng trắng, chất lượng cao cho các công trình thẩm mỹ")
                            .minStock(40)
                            .maxStock(400)
                            .coverImageUrl("https://product.hstatic.net/1000238808/product/ximang-insee_grande.png")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Bao").orElse(null))
                            .category(categoryRepository.findByName("Xi măng").orElse(null))
                            .brand(brandRepository.findByName("Holcim").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0009")
                            .barcode("123456789009")
                            .name("Vữa xây dựng")
                            .costPrice(new BigDecimal("40"))
                            .salePrice(new BigDecimal("55"))
                            .images(List.of(
                                    "https://tse4.mm.bing.net/th?id=OIP.wir26qm-YxXPrLoPeONsWgHaFD&pid=Api&P=0&h=220",
                                    "https://tse1.mm.bing.net/th?id=OIP.L_qFbOrH4PGLrbVB1bjzhQHaEj&pid=Api&P=0&h=220"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Bao")
                            .description("Vữa xây dựng, kết dính cao cho các công trình xây dựng")
                            .minStock(50)
                            .maxStock(500)
                            .coverImageUrl("https://tse4.mm.bing.net/th?id=OIP.7ltt5xKPL5xBs49O2rOD6QHaK8&pid=Api&P=0&h=220")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Bao").orElse(null))
                            .category(categoryRepository.findByName("Vữa").orElse(null))
                            .brand(brandRepository.findByName("Fico").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0010")
                            .barcode("123456789010")
                            .name("Thép hộp vuông 30x30")
                            .costPrice(new BigDecimal("90"))
                            .salePrice(new BigDecimal("120"))
                            .images(List.of(
                                    "https://vinhtansteel.vn/wp-content/uploads/2022/11/hs2-400x400.jpg",
                                    "https://vinhtansteel.vn/wp-content/uploads/2022/11/hs5.jpg"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Kg")
                            .description("Thép hộp vuông 30x30, độ bền cao, sử dụng trong công trình xây dựng")
                            .minStock(60)
                            .maxStock(600)
                            .coverImageUrl("https://vinhtansteel.vn/wp-content/uploads/2022/11/hs6-e1669783476378.jpg")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Kg").orElse(null))
                            .category(categoryRepository.findByName("Thép").orElse(null))
                            .brand(brandRepository.findByName("Hoa Sen").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0011")
                            .barcode("123456789011")
                            .name("Cát đen san lấp")
                            .costPrice(new BigDecimal("25"))
                            .salePrice(new BigDecimal("35"))
                            .images(List.of(
                                    "https://up.yimg.com/ib/th?id=OIP.qjsxagelonUE5nIXhtm-awHaE8&pid=Api&rs=1&c=1&qlt=95&w=161&h=107",
                                    "https://tse1.mm.bing.net/th?id=OIP.oQMber3ajjuLEKgl-8gb0gHaFj&pid=Api&P=0&h=220"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("M3")
                            .description("Cát đen dùng cho san lấp, thích hợp cho nền móng")
                            .minStock(25)
                            .maxStock(250)
                            .coverImageUrl("https://up.yimg.com/ib/th?id=OIP.lZXtnbRjuFXnZTzgL_CzfwHaE8&pid=Api&rs=1&c=1&qlt=95&w=161&h=107")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("M3").orElse(null))
                            .category(categoryRepository.findByName("Cát").orElse(null))
                            .brand(brandRepository.findByName("Insee").orElse(null))
                            .build(),

                    Material.builder()
                            .materialCode("SP0012")
                            .barcode("123456789012")
                            .name("Ống nhựa PVC D32")
                            .costPrice(new BigDecimal("12"))
                            .salePrice(new BigDecimal("18"))
                            .images(List.of(
                                    "https://tse4.mm.bing.net/th?id=OIP.8rfycKeEHpk9UYkQScx3rwHaHa&pid=Api&P=0&h=220",
                                    "https://tse3.mm.bing.net/th?id=OIP.OAlMgrceaB3aubP_71sRMwAAAA&pid=Api&P=0&h=220"
                            ))
                            .weightValue(1.0f)
                            .weightUnit("Mét")
                            .description("Ống nhựa PVC D32, chịu lực tốt, bền vững cho hệ thống cấp nước")
                            .minStock(80)
                            .maxStock(800)
                            .coverImageUrl("https://tse1.mm.bing.net/th?id=OIP.9cUgjhfEGdzGmNaJ71aP3wHaFC&pid=Api&P=0&h=220")
                            .isPoint(false)
                            .isActive(true)
                            .basicUnit(unitRepository.findByName("Mét").orElse(null))
                            .category(categoryRepository.findByName("Ống nước").orElse(null))
                            .brand(brandRepository.findByName("SCG").orElse(null))
                            .build()
            );

            materials.forEach(materialRepository::save);
        }
    }
}
