'use strict';


const date = new Date();
const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    
const hours = date.getHours();
const day = days[date.getDay()];
const time = date.toLocaleTimeString('en');
const newDate = new Date(new Date().getFullYear() + 1, 0, 1);    


const hello = document.createElement('div');
const dayOfWeek = document.createElement('div');
const currentTime = document.createElement('div');
const newYearDays = document.createElement('div');

const changeEnding = (num) => {
    const textVariant = [' день', ' дня', ' дней'];
    const n1 = num % 100,
        n2 = num % 10;
    return n1 > 4 && n1 < 21 ? num + textVariant[2] :
        n2 === 1 ? num + textVariant[0] :
        n2 > 1 && n2 < 5 ? num + textVariant[1] :
        num + textVariant[2];
};

hello.textContent = hours < 5 || hours > 22 ? 'Доброй ночи' :
    hours < 10 ? 'Доброе утро' :
    hours < 17 ? 'Добрый день' :
    'Добрый вечер';
    dayOfWeek.textContent = 'Сегодня: ' + day;
currentTime.textContent = 'Текущее время: ' + time;
newYearDays.textContent = 'До нового года осталось ' + 
    changeEnding(Math.ceil((newDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24));

document.body.append(hello, dayOfWeek, currentTime, newYearDays);