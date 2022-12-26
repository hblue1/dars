package kr.ac.dars.service.function;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.dars.dao.function.Function4Dao;
import kr.ac.dars.dto.function.Function4Dto;

@Service
@Transactional
public class Function4Service {
    // private static final String host = "192.168.35.244";
    private static final String host = "localhost";
    private static final String userName = "dragonseller_ftp";
    private static final String password = "DragonSeller*";
    private static final int port = 39540;

    @Autowired
    private Function4Dao dao;

    FTPClient ftpClient = null;
    
    public String connect() {
        String result = "connection failed";
        try{
            ftpClient = new FTPClient();

            ftpClient.connect(host, port);
            ftpClient.login(userName, password);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            result = "connection success";
        }
        catch(IOException e) {
            e.printStackTrace();
        }

        return result;
    }

    // ftp 연결을 해제한다.
    public void disconnection() {
        try {
            if (ftpClient.isConnected()) {
                ftpClient.logout();
                ftpClient.disconnect();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public List<Function4Dto> getFirstInfo(int level) {
        List<Function4Dto> result = dao.getFirstInfo(level);
        return result;
    }

    public List<String> getAudioInfo(String index) {
        List<Function4Dto> temp = dao.getAudioInfo(index);
        List<String> result = new ArrayList<String>();
        result.add(getAudioFile(index));
        for(int i = 0; i < temp.size(); i++) {
            result.add(temp.get(i).getContext());
        }
        return result;
    }

    // 경로, 파일명, 파일을 받아 해당 경로에 파일을 파일명으로 저장한다.

    public String getAudioFile(String index) {
        String audio = "";
        String path = "Server/function4";
        InputStream inputStream = null;
        try {
            // 경로를 / 구분
            String path_arr[] = path.split("/");
            for (int i = 0; i < path_arr.length; i++) {
                String directory = path_arr[i];
                if (directory != null && directory.length() > 0) {
                    String temp = "/" + directory;
                    if(ftpClient.changeWorkingDirectory(ftpClient.printWorkingDirectory()+temp)){
                        System.out.println("current folder: "+ftpClient.printWorkingDirectory());
                    }
                }
            }
            inputStream = ftpClient.retrieveFileStream(index+".wav");
            byte[] fileArray = IOUtils.toByteArray(inputStream);
            String b64string = new String(Base64.encodeBase64(fileArray));
            audio = "data:audio/wav;base64, "+b64string;
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            disconnection();
        }
        return audio;
    }
}
