import _ from 'lodash';
import './style.css'

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack3.4.1'], ' ');
  element.classList.add('hello');
  
  return element
}

document.body.appendChild(component())