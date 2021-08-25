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

    countTimer('31 august 2021');

    //Menu

    const toggleMenu = () =>{
        const bntMenu = document.querySelector('.menu');
        const menu = document.querySelector('menu');
        const closeBtn = document.querySelector('.close-btn');
        const menuItems = document.querySelectorAll('ul>li');
        const activeMenu = document.querySelector('.active-menu');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        
        bntMenu.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('menu')){
                handlerMenu();
            }
        });
        menu.addEventListener('click', (event) =>{
            let target = event.target;
            if(target.classList.contains('close-btn')){
                handlerMenu();
            } else{
                target = target.closest('li');
                if(target){
                    handlerMenu();
                }
            }
            console.log(target);
        });
        
    }

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup');
        const popupBtn = document.querySelectorAll('.popup-btn');
        const popupClose = document.querySelector('.popup-close');
        const screenWidth = window.screen.width

        let count = -100;

        const showPopUp = () => {
            if(screenWidth > 768){
                popup.style.top = count + '%';
                popup.style.display = 'block';
                let timer = setInterval(function() {
                    if (count >= 0) {
                        clearInterval(timer);
                    }
                    else {
                        count++;
                        popup.style.top = count + '%';
                    }
                }, 1);
            } else{
                console.log('none');
            }
        };



        popupBtn.forEach((item) => {
            item.addEventListener('click', (event) => {
                let target = event.target;
                if(target.classList.contains('popup-btn')){
                    showPopUp();
                }
            })
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popup.style.display = 'none';
                }
            }
        });
    }
    togglePopUp();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tab = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabContent[i].classList.add('d-none');
                    tab[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', (event) =>{
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
                return;
            }
            target = target.parentNode;
        });
    }
    tabs();

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const btn = document.querySelectorAll('.portfolio-btn');
        const slider = document.querySelector('.portfolio-content');
        const dotsHeader = document.querySelector('.portfolio-dots');
        const dot = document.querySelectorAll('.dot');

        let currentSlide = 0;
        let interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        
        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide = currentSlide < slide.length - 1 ? currentSlide + 1 : 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if(target.matches('.portfolio-btn, .dot')){
                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');

                if(target.matches('#arrow-right')){
                    currentSlide++;
                } else if(target.matches('#arrow-left')){
                    currentSlide--;
                } else if (target.matches('.dot')){
                    dot.forEach((element, index) => {
                        if(element == target){
                            currentSlide = index;
                        }
                    });
                }
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }
                if(currentSlide < 0){
                    currentSlide = slide.length - 1;
                }
                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            }
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);
    }

    const addDots = () => {
        const slide = document.querySelectorAll('.portfolio-item');
        const dotsHeader = document.querySelector('.portfolio-dots');
        slide.forEach(function(){
            const dot = document.createElement('li');
            dot.classList.add('dot');
            dotsHeader.appendChild(dot);
        });

        dotsHeader.children[0].classList.add('dot-active');
    }

    addDots();
    slider();
});