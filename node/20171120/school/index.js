var klass = require('./klass')

exports.add = function (klasses) {
  klasses.forEach((item, index) => {
    var _klass = item
    var teacherName = item.teacherName
    var students = item.students
    klass.add(teacherName, students)
  });
  // klass.add('Scott', ['白富美', '高富美'])
}


