package com.ch04;

import java.io.File;

public class SimpleFile48 {
  public static void main(String[] args) {
    File f = new File("C:\\Windows\\");
    System.out.println("是否存在? " + f.exists());
    System.out.println("是否為目錄? " + f.isDirectory());
    System.out.println("是否為一般檔案? " + f.isFile());
    System.out.println("是否可以讀取? " + f.canRead());
    System.out.println("上層目錄為? " + f.getParent());
  }
}
