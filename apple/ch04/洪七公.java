package com.ch04;

public class 洪七公 extends 人 {
	int 內力 = 500;
	public 洪七公() {
		姓名 = "洪七公";
		體力 = 200;
		
	}
	public void 降龍十八掌(){
		System.out.println(姓名+"發出陣陣掌風,使出降龍十八掌");
	}
	public void 降龍十八掌(人  p){
		System.out.println(姓名+"發出陣陣掌風,使出降龍十八掌打向"+p.姓名);
		體力 = 體力 - 60;
		內力 = 內力 - 80;
		p.體力 = p.體力 - 120;
		System.out.println("  對手"+p.姓名+"體力剩餘:"+p.體力);
	}
}
