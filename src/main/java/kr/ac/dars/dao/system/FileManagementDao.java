package kr.ac.dars.dao.system;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import kr.ac.dars.dto.system.FileManagementDto;

@Mapper
@Repository
public interface FileManagementDao {
    public List<FileManagementDto> getFileInfo();
}
