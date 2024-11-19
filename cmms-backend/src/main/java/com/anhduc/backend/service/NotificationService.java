package com.anhduc.backend.service;

import com.anhduc.backend.entity.Notification;
import com.anhduc.backend.enums.NotificationType;
import com.anhduc.backend.repository.NotificationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class NotificationService {

    NotificationRepository notificationRepository;

    public void createNotificationGoodsReceipt(String goodsReceiptCode, String createdBy, String totalAmount) {
        Notification notification = new Notification();
        notification.setType(NotificationType.GOODS_RECEIPT);
        notification.setRelatedCode(goodsReceiptCode);
        notification.setMessage(createdBy + " vừa nhập hàng với giá trị " + totalAmount );
        notificationRepository.save(notification);
    }

}
