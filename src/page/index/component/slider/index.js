require('./style.css');

var slider = {
    container: document.querySelector('.slider'),
    sliderList: document.querySelector('.slider-list'),
    sliderItems: document.querySelectorAll('.slider-item'),
    controller: document.querySelector('.slider-controller'),
    buttons: document.querySelectorAll('.slider-controller-item'),
    cycle: 3000,
    timer: null,
    init: function() {
        this.bindEvent();
        this.start();
        return this;
    },
    bindEvent: function() {
        var _this = this;
        this.controller.addEventListener('mouseover', function(e) {
            var idx = Array.from(_this.buttons).indexOf(e.target);
            if(idx >= 0) {
                _this.slideTo(idx);
                _this.stop();
            }
        });
        this.controller.addEventListener('mouseout', function(){
            _this.start();
        });
        this.sliderList.addEventListener('mouseover', function(e) {
            var sliderImgs = _this.container.querySelectorAll('img');
            var idx = Array.from(sliderImgs).indexOf(e.target);
            if(idx >= 0) {
                _this.stop();
            }
        });
        this.sliderList.addEventListener('mouseout', function(){
            _this.start();
        });
    },
    getSelectedItem: function() {
        var selected = this.container.querySelector('.slider-item-active');
        return selected;
    },
    getSelectedBtn: function() {
        var selected = this.container.querySelector('.controller-item-active');
        return selected;
    },
    getSelectedItemIdx: function() {
        return Array.from(this.sliderItems).indexOf(this.getSelectedItem());
    },
    slideTo: function(idx) {
        var selectedItem = this.getSelectedItem();
        var selectedBtn = this.getSelectedBtn();
        selectedItem.className = 'slider-item';
        selectedBtn.className = 'slider-controller-item';
        this.sliderItems[idx].className = 'slider-item slider-item-active';
        this.buttons[idx].className = 'slider-controller-item controller-item-active';
    },
    slideNext: function() {
        var currentIdx = this.getSelectedItemIdx();
        var nextIdx = (currentIdx + 1) % this.sliderItems.length;
        this.slideTo(nextIdx);
    },
    slidePrevious: function() {
        var currentIdx = this.getSelectedItemIdx();
        var previousIdx = (currentIdx + this.sliderItems.length - 1) % this.sliderItems.length;
        this.slideTo(previousIdx);
    },
    start() {
        this.stop();
        var _this = this;
        this.timer = setInterval(function(){
            _this.slideNext();
        }, this.cycle);
    },
    stop() {
        clearInterval(this.timer);
    }
}

module.exports = slider.init();