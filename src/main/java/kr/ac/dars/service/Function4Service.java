package kr.ac.dars.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
// import java.util.Properties;
// import java.util.Vector;

// import com.jcraft.jsch.Channel;
// import com.jcraft.jsch.ChannelSftp;
// import com.jcraft.jsch.JSch;
// import com.jcraft.jsch.JSchException;
// import com.jcraft.jsch.Session;
// import com.jcraft.jsch.SftpException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.io.IOUtils;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.ac.dars.dao.Function4Dao;
import kr.ac.dars.dto.Function4Dto;

@Service
@Transactional
public class Function4Service {
    private static final String host = "localhost";
    private static final String userName = "dragonseller_ftp";
    private static final String password = "DragonSeller*";
    private static final int port = 39540;

    // private Session session = null;
    // private Channel channel = null;
    // private ChannelSftp channelSftp = null;

    @Autowired
    private Function4Dao dao;

    FTPClient ftpClient = null;

    public List<Function4Dto> getAudioInfo(Function4Dto dto) {
        List<Function4Dto> result = dao.getAudioInfo(dto);
        return result;
    }
    
    public String connect() {
        String result = "연결 실패";
        try{
            ftpClient = new FTPClient();

            ftpClient.connect(host, port);
            ftpClient.login(userName, password);
            ftpClient.enterLocalPassiveMode();
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            result = "연결 성공";
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

    // 경로, 파일명, 파일을 받아 해당 경로에 파일을 파일명으로 저장한다.

    public List<String> getAudioFile(List<String> filename) {
        List<String> result = new ArrayList<String>();
        String path = "/server/function4";
        InputStream inputStream = null;
        try {
            // 경로를 / 구분
            String path_arr[] = path.split("/");
            for (int i = 0; i < path_arr.length; i++) {
                String directory = path_arr[i];
                if (directory != null && directory.length() > 0) {
                    // 경로를 찾아 들어 간다.
                    if (!ftpClient.changeWorkingDirectory(directory)) {
                        System.out.println("해당 경로가 없습니다!");
                        break;
                    }
                }
            }
            System.out.println(ftpClient.printWorkingDirectory());
            for(String file : filename)
            {
                inputStream = ftpClient.retrieveFileStream(file);
                byte[] fileArray = IOUtils.toByteArray(inputStream);
                String b64string = new String(Base64.encodeBase64(fileArray));
                System.out.println(b64string);
                result.add("data:audio/wav;base64, "+b64string);
            }
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
        return result;
    }

    /*
    public String connect() {
        
        JSch jsch = new JSch();
        try{ // Jsch 세션 생성
            session = jsch.getSession(userName, host, port);
            session.setPassword(password);
            
            // 세션과 관련된 정보 설정
            Properties config = new Properties();
            // 호스트정보 검사 하지 않음.
            config.put("StrictHostKeyChecking", "no");

            session.setConfig(config);
            session.connect();

            channel = session.openChannel("sftp");
            channel.connect();
            result = "연결 성공";
        } catch(JSchException je) {
            je.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
        channelSftp = (ChannelSftp) channel;
        
        return result;
    }
    */

    /*
    public void disconnection() {
        channelSftp.quit();
        channel.disconnect();
        session.disconnect();
    }
    */

    /*
    @SuppressWarnings("unchecked")
    public List<String> getAudioFile(List<String> filename) {
        List<String> result = new ArrayList<String>();
        InputStream is = null;

        try
        {
            String path = "/server/function4";
            channelSftp.cd(path);
            Vector<ChannelSftp.LsEntry> fileList = channelSftp.ls(path);

            for(String fname : filename)
            {
                for(ChannelSftp.LsEntry entry : fileList) {
                    if(!fname.equals(entry.getFilename()))
                    {
                        continue;
                    }
                    try {
                        is = channelSftp.get(entry.getFilename());
                        byte[] fileArray = IOUtils.toByteArray(is);
                        String b64string = new String (Base64.encodeBase64(fileArray));
                        result.add("data:audio/wav;base64, "+b64string);
                        
                        is.close();            
                    } catch(IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            
        }
        catch (SftpException se) {
            se.printStackTrace();
        } catch (Exception e){
            e.printStackTrace();
        }
        
        return result;
    }
    */
}
