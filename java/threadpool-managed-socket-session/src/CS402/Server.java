package CS402;
import java.io.*;
import java.net.Socket;
import java.net.ServerSocket;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class Server {
    public static void main(String[] args) throws IOException {
        //listen the 8888 port
        ServerSocket serverSocket = new ServerSocket(8888);
        System.out.println("----------Server----------");
        Socket socket = null;
        //create thread pool
        Executor servicePool = Executors.newFixedThreadPool(3);

        boolean flag = true;
        while (flag) {
            //wait for client connection
            socket = serverSocket.accept();
            System.out.println("a client connects from " + socket.getInetAddress() + ":" + socket.getPort());
            //put one task into the thread pool
            servicePool.execute(new ServerThread(socket));
        }
        serverSocket.close();
    }
}

class ServerThread implements Runnable {
    private Socket socket = null;
    public ServerThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            //create output stream
            PrintStream out = new PrintStream(socket.getOutputStream());
            //get input stream
            BufferedReader inputBuf = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            boolean flag = true;
            while (flag) {
                //get content
                String inputStr = inputBuf.readLine();
                if (inputStr == null || "".equals(inputStr)) {
                    flag = false;
                } else {
                    System.out.println("From: " + socket.getInetAddress() + ":" + socket.getPort() + " Content: " + inputStr);
                    //add the length of the content and then return to client
                    out.println(inputStr + " Content length: " + inputStr.length());
                }
            }
            out.close();
            inputBuf.close();
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
