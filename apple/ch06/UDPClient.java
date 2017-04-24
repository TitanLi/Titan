import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPClient {
  public static void main(String[] args)
      throws IOException {
    InetAddress addr = InetAddress.getLocalHost();
    String data = "ABC";
    byte[] buf = data.getBytes();
    DatagramPacket pkt = new DatagramPacket(buf,
        buf.length, addr, 9950);
    DatagramSocket ds = new DatagramSocket();
    ds.send(pkt);
  }
}
