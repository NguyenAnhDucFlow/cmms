package com.anhduc.backend.configuration;

import com.anhduc.backend.dto.GoodsReceiptDTO;
import com.anhduc.backend.dto.GoodsReceiptDetailDTO;
import com.anhduc.backend.dto.PurchaseOrderDTO;
import com.anhduc.backend.dto.PurchaseOrderDetailDTO;
import com.anhduc.backend.entity.GoodsReceipt;
import com.anhduc.backend.entity.GoodsReceiptDetail;
import com.anhduc.backend.entity.PurchaseOrder;
import com.anhduc.backend.entity.PurchaseOrderDetail;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.payos.PayOS;

@Configuration
@EnableJpaAuditing
public class AppConfig {

    @Value("${PAYOS_CLIENT_ID}")
    private String clientId;

    @Value("${PAYOS_API_KEY}")
    private String apiKey;

    @Value("${PAYOS_CHECKSUM_KEY}")
    private String checksumKey;



    @Bean
    public PayOS payOS() {
        return new PayOS(clientId, apiKey, checksumKey);
    }


    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Cấu hình map PurchaseOrder -> PurchaseOrderDTO
        modelMapper.typeMap(PurchaseOrder.class, PurchaseOrderDTO.class)
                .addMapping(src -> src.getSupplier().getName(), PurchaseOrderDTO::setSupplierName)
                .addMapping(src -> src.getStore().getName(), PurchaseOrderDTO::setStoreName);

        // Cấu hình map PurchaseOrderDetail -> PurchaseOrderDetailDTO
        modelMapper.typeMap(PurchaseOrderDetail.class, PurchaseOrderDetailDTO.class);

        //------------------------------------

        modelMapper.typeMap(GoodsReceipt.class, GoodsReceiptDTO.class)
                .addMapping(src -> src.getSupplier().getName(), GoodsReceiptDTO::setSupplierName)
                .addMapping(src -> src.getStore().getName(), GoodsReceiptDTO::setStoreName);

        // Cấu hình map GoodsReceiptDetail -> GoodsReceiptDetailDTO
        modelMapper.typeMap(GoodsReceiptDetail.class, GoodsReceiptDetailDTO.class);

        return new ModelMapper();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
