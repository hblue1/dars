// package kr.ac.dars.service;

// import java.io.IOException;
// import java.io.InputStream;
// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.List;
// import java.util.Properties;
// import java.util.Vector;

// import com.jcraft.jsch.Channel;
// import com.jcraft.jsch.ChannelSftp;
// import com.jcraft.jsch.JSch;
// import com.jcraft.jsch.JSchException;
// import com.jcraft.jsch.Session;
// import com.jcraft.jsch.SftpException;

// import org.apache.commons.io.IOUtils;
// import org.apache.tomcat.util.codec.binary.Base64;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import kr.ac.dars.dao.Function4Dao;
// import kr.ac.dars.dto.Function4Dto;

// @Service
// @Transactional
// public class Function4Service {
//     private static final String host = "localhost";
//     private static final String userName = "dars";
//     private static final String password = "ds2022";
//     private static final int port = 8091;

//     private Session session = null;
//     private Channel channel = null;
//     private ChannelSftp channelSftp = null;

//     @Autowired
//     private Function4Dao dao;

//     public List<Function4Dto> getAudioInfo(Function4Dto dto) {
//         List<Function4Dto> result = dao.getAudioInfo(dto);
//         Collections.shuffle(result);
//         return result;
//     }
//     public String connect() {
//         String result = "연결 실패";
//         JSch jsch = new JSch();
//         try{ // Jsch 세션 생성
//             session = jsch.getSession(userName, host, port);
//             session.setPassword(password);
            
//             // 세션과 관련된 정보 설정
//             Properties config = new Properties();
//             // 호스트정보 검사 하지 않음.
//             config.put("StrictHostKeyChecking", "no");

//             session.setConfig(config);
//             session.connect();

//             channel = session.openChannel("sftp");
//             channel.connect();
//             result = "연결 성공";
//         } catch(JSchException je) {
//             je.printStackTrace();
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//         channelSftp = (ChannelSftp) channel;

//         return result;
//     }

//     @SuppressWarnings("unchecked")
//     public List<String> getAudioFile(List<String> filename) {
//         List<String> result = new ArrayList<String>();
//         InputStream is = null;

//         try
//         {
//             String path = "/sound/function4";
//             channelSftp.cd(path);
//             Vector<ChannelSftp.LsEntry> fileList = channelSftp.ls(path);

//             for(String fname : filename)
//             {
//                 for(ChannelSftp.LsEntry entry : fileList) {
//                     if(!fname.equals(entry.getFilename()))
//                     {
//                         continue;
//                     }
//                     try {
//                         is = channelSftp.get(entry.getFilename());
//                         byte[] fileArray = IOUtils.toByteArray(is);
//                         String b64string = new String (Base64.encodeBase64(fileArray));
//                         result.add("data:audio/wav;base64, "+b64string);
                        
//                         is.close();            
//                     } catch(IOException e) {
//                         e.printStackTrace();
//                     }
//                 }
//             }
            
//         }
//         catch (SftpException se) {
//             se.printStackTrace();
//         } catch (Exception e){
//             e.printStackTrace();
//         }
        
//         return result;
//     }

//     public void disconnection() {
//         channelSftp.quit();
//         channel.disconnect();
//         session.disconnect();
//     }
// }
