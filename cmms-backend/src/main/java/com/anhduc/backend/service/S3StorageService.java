package com.anhduc.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;


@Service
public class S3StorageService {

    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    private S3Client s3Client;

    public String uploadFile(String filename, MultipartFile multipartFile) throws IOException, S3Exception {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        InputStream inputStream = multipartFile.getInputStream();
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, multipartFile.getSize()));

        GetUrlRequest request = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        URL url = s3Client.utilities().getUrl(request);

        return url.toString();
    }

    public void deleteFile(String filename) throws S3Exception, MalformedURLException {
        URL url = new URL(filename);

        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(url.getPath().substring(1))
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    public void deleteFiles(List<String> filenames) throws S3Exception, MalformedURLException {
        ArrayList<ObjectIdentifier> toDelete = new ArrayList<>();

        for (String objKey : filenames) {
            URL url = new URL(objKey);
            toDelete.add(ObjectIdentifier.builder()
                    .key(url.getPath().substring(1))
                    .build());
        }

        DeleteObjectsRequest deleteObjectRequest = DeleteObjectsRequest.builder()
                .bucket(bucketName)
                .delete(Delete.builder().objects(toDelete).build())
                .build();

        s3Client.deleteObjects(deleteObjectRequest);
    }

    public InputStream downloadFile(String filename) throws S3Exception {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        return s3Client.getObject(getObjectRequest);
    }
}
