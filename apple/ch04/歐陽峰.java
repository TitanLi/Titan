package com.ch04;

public class 歐陽峰 extends 人 {
	int 內力 = 400;
	public 歐陽峰() {
		姓名 = "歐陽峰";
		體力 = 180;
		
	}
	public void 蛤蟆功(){
		System.out.println(姓名+"發出呱呱怪聲,使出蛤蟆功");
	}
	public void 蛤蟆功(人  p){
		System.out.println(姓名+"發出呱呱怪聲,使出蛤蟆功打向"+p.姓名);
		體力 = 體力 - 40;
		內力 = 內力 - 50;
		p.體力 = p.體力 - 80;
		System.out.println("  對手"+p.姓名+"體力剩餘:"+p.體力);
	}
}
