// 申明class类
class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
    console.log(this);
  }
}

// 接口 接口来描述一个拥有firstName和lastName字段的对象
interface Person {
  firstName: string;
  lastName: string;
}

// 变量名: 数据类型
function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);