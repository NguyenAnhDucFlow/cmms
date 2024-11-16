package com.anhduc.backend.configuration;

import com.anhduc.backend.dto.PurchaseOrderDTO;
import com.anhduc.backend.dto.PurchaseOrderDetailDTO;
import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.entity.PurchaseOrderDetail;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableJpaAuditing
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Cấu hình map PurchaseOrder -> PurchaseOrderDTO
        modelMapper.typeMap(PurchaseOrder.class, PurchaseOrderDTO.class)
                .addMapping(src -> src.getSupplier().getName(), PurchaseOrderDTO::setSupplierName)
                .addMapping(src -> src.getStore().getName(), PurchaseOrderDTO::setStoreName);

        // Cấu hình map PurchaseOrderDetail -> PurchaseOrderDetailDTO
        modelMapper.typeMap(PurchaseOrderDetail.class, PurchaseOrderDetailDTO.class);

        return new ModelMapper();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
