//Kiểm tra nhập liệu

function Validation () {
    
    //Các phương thức kiểm tra hợp lệ
    //Kiểm tra rỗng
    this.required = function (value, selectorError, name) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' Không được để trống !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    };

    //Kiểm tra kí tự
    this.allLetter = function (value, selectorError, name) {
        var regexAllLetter = /^[A-Z a-z]+$/;
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = name + ' Phải là kí tự !'
        return false;
    };

    //Kiểm tra số
    this.allNumber = function (value, selectorError, name) {
        var regexNumber = /^[0-9]+$/;
        if(regexNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
       document.querySelector(selectorError).innerHTML= name + ' Phải là số !';
        return false;
    };

    //Kiểm tra độ dài
    this.minMaxLength = function (value, selectorError, minLength, maxLength, name) {
        //Nếu chuỗi nhập vào có số ký tự vượt quá min, max length => Không hợp lệ
        if (value.length < minLength || value.length > maxLength) {
            document.querySelector(selectorError).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    };

    //Kiểm tra giá trị
    this.minMaxValue = function (value, selectorError, minValue, maxValue, name) {
        if(value < minValue || value > maxValue) {
            document.querySelector(selectorError).innerHTML = `
            ${name} từ ${minValue} đến ${maxValue}`;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    };
}

