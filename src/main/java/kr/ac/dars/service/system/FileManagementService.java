package kr.ac.dars.service.system;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ac.dars.dao.system.FileManagementDao;
import kr.ac.dars.dto.system.FileManagementDto;

@Service
@Transactional
public class FileManagementService {
    @Autowired
    private FileManagementDao dao;

    public List<FileManagementDto> getFileInfo() {
        return dao.getFileInfo();
    }
}
