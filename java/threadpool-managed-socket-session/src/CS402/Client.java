package CS402;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.Socket;
import java.net.SocketTimeoutException;

public class Client {
    public static void main(String[] args) throws IOException {
        //build the connection
        Socket socket = new Socket("127.0.0.1", 8888);
        System.out.println("----------Client----------");
        socket.setSoTimeout(10000);
        //get the input from the keyboard
        BufferedReader inputBuf = new BufferedReader(new InputStreamReader(System.in));
        //creat output stream
        PrintStream out = new PrintStream(socket.getOutputStream());
        //get the stream from the server
        BufferedReader returnBuf = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        boolean flag = true;
        while (flag) {
            System.out.print("Input something: ");
            String outputStr = inputBuf.readLine();
            //sent data to the server
            out.println(outputStr);
            try {
                //read the data from the stream
                String returnStr = returnBuf.readLine();
                System.out.println("Response: " + returnStr);
            } catch (SocketTimeoutException e) {
                System.out.println("Time out, No response");
            }
        }
        inputBuf.close();
        if (socket != null) {
            socket.close();
        }
    }
}