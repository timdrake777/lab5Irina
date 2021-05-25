//Объект кота
const cat = {

  //Характеристики
  satiety: 50,
  hydration: 50,
  satisfaction: 50,
  manners: 50,
  age: 1,

  //Максимальные характеристики
  maxSatiety: 200,
  maxHydration: 100,
  maxSatisfaction: 100,
  maxManners: 100,
  health: 100

};

//Хэндлер взросления
let timer;

//Хэндлер дней
let interval;

//Скорость течения дня
let daySpeed = 1000;

//Время до взросления
let adulthood = 10000;

//КД действий
let actionCooldown = daySpeed / 5;


let fatLimit = 150;
let anorexiaLimit = 30;

//Запуск функции start после загрузки DOM модели
document.addEventListener('DOMContentLoaded', start);

//НАЧАЛО
function start() {
  cat.satiety = 50;
  cat.hydration = 50;
  cat.satisfaction = 50;
  cat.manners = 50;
  cat.age = 1;
  cat.health = 100;

  //удаление окна
  document.getElementById('game-over').style.display = 'none';

  //ВЫВОД
  document.getElementById('satiety').innerHTML = cat.satiety + '%';
  document.getElementById('hydration').innerHTML = cat.hydration + '%';
  document.getElementById('satisfaction').innerHTML = cat.satisfaction + '%';
  document.getElementById('manners').innerHTML = cat.manners + '%';
  document.getElementById('health').innerHTML = cat.health + '%';
  document.getElementById('timer-counter').innerHTML = cat.age;

  //время
  interval = setInterval(loop, 1000);
  timer = setTimeout((start) => gameOver('win'), adulthood);
}


function loop(decrement = 10) {


  //уменьшение характеристик со временем
  if (cat.satiety != 0) {
    cat.satiety -= parseInt(decrement);
  }
  if (cat.hydration != 0) {
    cat.hydration -= parseInt(decrement);
  }
  if (cat.satisfaction != 0) {
    cat.satisfaction -= parseInt(decrement);
  }
  if (cat.manners != 0) {
    cat.manners -= parseInt(decrement);
  }

  //увеличение дней
  cat.age += 10;

  //условия для уменьшения/увеличения здоровья
  if (((cat.satiety > 150) && (cat.satiety <= 200)) || ((cat.satiety >= 0) &&
   (cat.satiety <= 30)) || (cat.hydration == 0) || (cat.satisfaction == 0)) {
    cat.health -= parseInt(decrement);
  }

  //условия для изменения изображений
  if(cat.health == 0) {
    document.getElementById('pet').src = "ВЗРЫВ";
    gameOver('lose');
  }
  else if ((cat.satiety > 150) && (cat.satiety <= 200)) {
    document.getElementById('pet').src = "булимия";
  }
  else if ((cat.satiety > 30) && (cat.satiety <= 150)) {
    document.getElementById('pet').src = "идеал";
  }
  else if ((cat.satiety >= 0) && (cat.satiety <= 30)) {
    document.getElementById('pet').src = "анорексия";
  }


  //вывод характеристик
  document.getElementById('satiety').innerHTML = cat.satiety + '%';
  document.getElementById('hydration').innerHTML = cat.hydration + '%';
  document.getElementById('satisfaction').innerHTML = cat.satisfaction + '%';
  document.getElementById('manners').innerHTML = cat.manners + '%';
  document.getElementById('health').innerHTML = cat.health + '%';
  document.getElementById('timer-counter').innerHTML = cat.age;
}


//конец игры, последнее окно
function gameOver(end) {
  clearInterval(interval);
  clearTimeout(timer);

  let result = '';
  let overall;

  if (end == 'lose') {
    overall = 'Игра окончена. Вы не справились.<br>';
  }

  //переписать, добавить плохие характеристики при хорошем исходе 
  else {
    if (cat.health <= 40) {
      overall = 'Ваш уход за котенком был неправильным.<br>';
      if ((cat.satiety > 150) && (cat.satiety <= 200)) {
        overall += ' У Вашей кошки ожирение.';
      }
      else if ((cat.satiety >= 0) && (cat.satiety <= 30)) {
        overall += ' У Вашей кошки анорексия.'
      }
      if (cat.hydration <= 20) {
        overall += ' Вашей кошке недостаточно воды.';
      }
      if (cat.satisfaction <= 20) {
        overall += ' У Вашей кошки стресс.';
      }
    }
    else {
      overall = 'Молодцы! Вы хорошо ухаживали за кошкой.'
    }
  }



  // добавить обезвоживание
  // добавить воспитание (одичала) -- не усложняй сука
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('result').innerHTML = result;

  //условия проигрыша
  document.getElementById('overall').innerHTML = overall;
}

//нажатие на кнопки
function performAction(action, increment = 20) {

  document.getElementById(action).disabled = true;
  setTimeout(function() {document.getElementById(action).disabled = false;},
   actionCooldown);

  switch (action) {
    case 'feed':
      cat.satiety += increment;
      document.getElementById('satiety').innerHTML = cat.satiety + '%';
      break;

    case 'water':
      cat.hydration += increment;
      document.getElementById('hydration').innerHTML = cat.hydration + '%';
      break;

    case 'play':
      cat.satisfaction += increment;
      document.getElementById('satisfaction').innerHTML = cat.satisfaction + '%';
      break;

    case 'clean':
      cat.satisfaction += increment;
      document.getElementById('satisfaction').innerHTML = cat.satisfaction + '%';
      break;

    case 'train':
      cat.manners += increment;
      document.getElementById('manners').innerHTML = cat.manners + '%';
      break;
  }
}
