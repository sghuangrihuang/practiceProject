// i 不区分大小写 其中hi是正则表达式的主体
var patt1  = /hi/i

// var testStr1 = 'hi'; //0  

// \b 元字符 单词分界 只匹配一个位置 精确地查找hi
var patt2 = /\bhi\b/i

// var testStr2 = 'him hi'; //4 

// . 元字符  匹配除了换行符以外的任意字符
// * 元字符  前边的内容可以连续重复使用任意次以使整个表达式得到匹配
// .* 任意数量的不包含换行的字符
var patt3 = /\bhi\b.*\bLucy\b/i 

// var testStr3 = 'him hi test number hi lucy' //4


// \d 元字符 匹配一个数字
// {3} 只能不多不少匹配重复2次
// {5,12}则是重复的次数不能少于5次，不能多于12次
var patt4 = /0\d{3}-\d{7}/ 

var testStr4 = "0663-2928360"

// \s 元字符 配任意的空白符，包括空格，制表符(Tab)，换行符，中文全角空格等
// \w 元字符 字母或数字或下划线或汉字等
var patt5 = /\ba\w*\b/

// 限定符
// *	重复零次或更多次
// +	重复一次或更多次
// ?	重复零次或一次
// {n}	重复n次
// {n,}	重复n次或更多次
// {n,m}	重复n到m次

console.log(testStr4.search(patt4))