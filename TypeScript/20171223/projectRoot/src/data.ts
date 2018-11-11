// 变量名: 数据类型
let str: string = "ts";

let sen: string = `hello, ${str}`;

let num: number = 10086;

let bool: boolean = true;

let numList: number[] = [1, 2, 3, 4];

let numList2: Array<number> = [1, 2, 3, 5];

let list2d: Array<Array<number>> = [[1, 2, 3], [1, 2, 3]];

// 元组
// 但是元素数据类型的类型和前几个元素的顺序都是有限制
let x: [string, number] = ["hello", 10];

// 枚举
// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值
// 1
enum Color { Red = 1, Green, Blue }
let c: Color = Color.Green;

// any 任意类型

let textType: any = '1';
let anyList: any[] = [1, true, "free"];

// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 
// 当一个函数没有返回值时，你通常会见到其返回值类型是 void：

let u: undefined = undefined;
let n: null = null;

// 函数
// 必选参数
function add(x: number, y: number): number {
  return x + y;
}
// 可选参数
function sayHello(firstName: string, mess?: string): void {
  console.log(`${firstName}：${mess}`);
}

class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

interface LabelledValue {
  label: string;
}

function printLabel(LabelledObj: LabelledValue) {
  console.log(LabelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 实现接口类
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}

// 泛型变量T
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>("myString");

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg;
}

let myIdenTity: <T>(arg: T) => T = identity