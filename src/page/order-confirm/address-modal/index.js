require('./style.css');
var util = require('util/util');
var address = require('service/address-service.js');
var addressModalTpl = require('./address-modal.tpl');
var cities = require('util/cities/index.js');

var addressModal = {
    show: function (option) {
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        this.loadModal();
        this.bindEvent();
    },
    hide: function () {
        this.$modalWrap.empty();
    },
    bindEvent: function () {
        var _this = this;
        this.$modalWrap.find('#receiver-province').change(function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        this.$modalWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            // 使用新地址
            if (!isUpdate && receiverInfo.status) {
                address.save(receiverInfo.data, function(res) {
                    util.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                        && _this.option.onSuccess(res);
                }, function(err) {
                    util.errorTips(err);
                });
            } else if (isUpdate && receiverInfo.status) {
                address.update(receiverInfo.data, function(res) {
                    util.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                        && _this.option.onSuccess(res);
                }, function(err) {
                    util.errorTips(err);
                });
            } else {
                util.errorTips(receiverInfo.errMsg || '错误了');
                return false;
            }
        });
        this.$modalWrap.find('.close').click(function () {
            _this.hide();
        });
        this.$modalWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        });
    },
    loadModal: function () {
        var addressModalHtml = util.renderHtml(addressModalTpl, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        // 加载省份和城市
        this.loadProvince();
    },
    loadProvince: function () {
        var provinces = cities.getProvinces() || [];
        var $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        if(this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    loadCities: function (provinceName) {
        var _cities = cities.getCities(provinceName) || [];
        var $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(_cities));
        if(this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0; i < optionArray.length; i++) {
            html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>'
        }
        return html;
    },
    getReceiverInfo: function () {
        var receiverInfo = {},
            result = {
                status: false,
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());
        
        if(this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        
        
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入收件人所在城市';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
};

module.exports = addressModal;