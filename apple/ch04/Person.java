package com.ch04;

public class Person {
	float weight;
	float height;
	public Person(){
		weight = 0;
		height = 0;
	}
	public Person(float w, float h){
		weight = w;
		height = h;
	}
	
	public float getBmi(){
		float bmi = weight / (height/100 * height/100);
		return bmi;
	}
	public static void main(String args[]){
		Person p = new Person(65, 170);
		System.out.println(p.getBmi());
	}
}

