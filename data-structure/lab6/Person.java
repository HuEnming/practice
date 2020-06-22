package pers.enming.cs210.lab6;
public class Person {
	private String name;// 成员变量（属性）
	private int age;// 成员变量（属性）

	public String getName() {// getter方法 固定格式 get + 成员变量名（首字母必须大写）
		// return name;
		return name.toUpperCase();// 控制name必须以大写形式输出
	}

	public void setName(String name) {// setter方法 固定格式 set + 成员变量名（首字母必须大写）
		if (name.length() < 100) // if判断控制名字长度必须小于100
			this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		if (age < 150 && age > 0)
			this.age = age;
	}
}

class A {
	public void a() {
		Person person = new Person();//外部必须调用setter/getter方法为person赋值，更加安全
		person.setName("Donald Trump");
		String name = person.getName();
		person.setAge(200);
	}
}
