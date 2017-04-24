import java.io.IOException;
import java.net.ServerSocket;

public class PortScanner {
	public void scan(){
		for (int i=1; i< 65535; i++){
			try {
				ServerSocket ss = new ServerSocket(i);
			} catch (IOException e) {
				System.out.println("port "+ i + "被占用中");
			}
		}
	}

	public static void main(String[] args) {
		PortScanner pserver = new PortScanner();
		pserver.scan();
	}
}
