// 申明class类
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName, age) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.age = age;
        this.fullName = firstName + "\" \"" + middleInitial + "\" \"" + lastName;
    }
    Student.prototype.sayHello = function () {
        console.log(this.fullName);
    };
    return Student;
}());
// 变量名: 数据类型
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User", 18);
document.body.innerHTML = greeter(user);
