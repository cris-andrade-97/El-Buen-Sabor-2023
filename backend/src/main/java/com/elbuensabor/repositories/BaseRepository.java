package com.elbuensabor.repositories;

import com.elbuensabor.entities.Base;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;

@NoRepositoryBean
public interface BaseRepository<E extends Base, ID extends Serializable> extends JpaRepository<E, ID> {


    E findFirstByOrderByIdDesc();

}
