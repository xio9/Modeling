window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    //Timer
    function countTimer(deadline){
        let timerHours = document.getElementById('timer-hours');
        let timerMinutes = document.getElementById('timer-minutes');
        let timerSeconds = document.getElementById('timer-seconds');
        let idInterval = 0;
        
        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime();
            let dateNow = new Date().getTime();
            let timeRemaining = (dateStop - dateNow) / 1000;
            let seconds = Math.floor(timeRemaining % 60);
            let minutes = Math.floor((timeRemaining / 60) % 60);
            let hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }
        
        let addZero = elem => {
            if (String(elem).length === 1) { return '0' + elem; } else { return String(elem); }
        };

        let updateClock = () => {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };
        idInterval = setInterval(updateClock, 1000);
    };

    countTimer('21 august 2021');

    //Menu

    const toggleMenu = () =>{

        const bntMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');

        bntMenu.addEventListener('click', () => {
            if(!menu.style.transform || menu.style.transform === 'translate(-100%)'){
                menu.style.transform = `translateX(0)`;
            } else{
                menu.style.transform = `translateX(-100)`;
            }
        });

        closeBtn.addEventListener('click', () => {
            menu.style.transform = `translate(-100%)`;
        });
    }

    toggleMenu();
});