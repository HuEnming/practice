package pers.enming.cs210.lab6;
public class Person {
	private String name;// ��Ա���������ԣ�
	private int age;// ��Ա���������ԣ�

	public String getName() {// getter���� �̶���ʽ get + ��Ա������������ĸ�����д��
		// return name;
		return name.toUpperCase();// ����name�����Դ�д��ʽ���
	}

	public void setName(String name) {// setter���� �̶���ʽ set + ��Ա������������ĸ�����д��
		if (name.length() < 100) // if�жϿ������ֳ��ȱ���С��100
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
		Person person = new Person();//�ⲿ�������setter/getter����Ϊperson��ֵ�����Ӱ�ȫ
		person.setName("Donald Trump");
		String name = person.getName();
		person.setAge(200);
	}
}
