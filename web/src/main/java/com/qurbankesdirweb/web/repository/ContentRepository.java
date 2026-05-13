package com.qurbankesdirweb.web.repository;

import com.qurbankesdirweb.web.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    Content findByKey(String key);
}
