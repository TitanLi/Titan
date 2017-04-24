package com.ch07;

public class PriorityTester {
  public static void main(String[] args) {
    Thread thr = new Thread();
    // 印出thr目前的優先權值
    System.out.println("thr目前的優先權值:"
        + thr.getPriority());
    // 變更為最高優先權
    thr.setPriority(Thread.MAX_PRIORITY);
    System.out.println("thr目前的優先權值:"
        + thr.getPriority());
    // 變更優先權值為8
    thr.setPriority(8);
    System.out.println("thr目前的優先權值:"
        + thr.getPriority());
  }
}
