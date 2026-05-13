package com.qurbankesdirweb.web.controller;

import com.qurbankesdirweb.web.entity.Content;
import com.qurbankesdirweb.web.repository.ContentRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/content")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Content API", description = "API for retrieving bilingual content")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @GetMapping
    @Operation(summary = "Get all content in specified language",
            description = "Returns a map of content keys and their localized values")
    public ResponseEntity<Map<String, String>> getContent(
            @Parameter(description = "Language code: 'az' for Azerbaijani or 'en' for English", example = "en")
            @RequestParam(value = "lang", defaultValue = "en") String lang) {
        
        List<Content> contentList = contentRepository.findAll();
        Map<String, String> result = new HashMap<>();

        for (Content content : contentList) {
            if ("az".equalsIgnoreCase(lang)) {
                result.put(content.getKey(), content.getValue_az());
            } else {
                result.put(content.getKey(), content.getValue_en());
            }
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{key}")
    @Operation(summary = "Get content by key in specified language")
    public ResponseEntity<Map<String, String>> getContentByKey(
            @Parameter(description = "Content key") @PathVariable String key,
            @Parameter(description = "Language code: 'az' or 'en'", example = "en")
            @RequestParam(value = "lang", defaultValue = "en") String lang) {
        
        Content content = contentRepository.findByKey(key);
        if (content == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, String> result = new HashMap<>();
        if ("az".equalsIgnoreCase(lang)) {
            result.put(content.getKey(), content.getValue_az());
        } else {
            result.put(content.getKey(), content.getValue_en());
        }

        return ResponseEntity.ok(result);
    }
}
