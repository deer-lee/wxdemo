function checkPhone(val) {
  if (val === '' || val === null || val === undefined) {
    wx.showToast({
      title: '请输入手机号',
      icon: 'none'
    });
    return false;
  } else {
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(val)) {
      wx.showToast({
        title: '格式错误',
        icon: 'none'
      });
      return false;
    } else {
      return true;
    }
  }
}
function checkRequired(val, msg) {
  if (val === '' || val === null || val === undefined) {
    wx.showToast({
      title: msg,
      icon: 'none'
    });
    return false;
  } else {
    return true;
  }
}

function checkPassword(val, msg) {
  if (val === '' || val === null || val === undefined) {
    wx.showToast({
      title: msg,
      icon: 'none'
    });
    return false;
  } else {
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(val)) {
      wx.showToast({
        title: '请设置6-14位字母+数字',
        icon: 'none'
      });
      return false;
    } else {
      return true;
    }
  }
}
//统一社会信用编码
function CheckSocialCreditCode(Code, mes) {
  var patrn = /^[0-9A-Z]+$/;
  //18位校验及大写校验  
  if ((Code.length != 18) || (patrn.test(Code) == false)) {
    wx.showToast({
      title: '不是有效的统一社会信用编码！',
      icon: 'none'
    });
    return false;
  }
  else {
    var Ancode;//统一社会信用代码的每一个值  
    var Ancodevalue;//统一社会信用代码每一个值的权重   
    var total = 0;
    var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子   
    var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    //不用I、O、S、V、Z   
    for (var i = 0; i < Code.length - 1; i++) {
      Ancode = Code.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total = total + Ancodevalue * weightedfactors[i];
      //权重与加权因子相乘之和   
    }
    var logiccheckcode = 31 - total % 31;
    if (logiccheckcode == 31) {
      logiccheckcode = 0;
    }
    var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
    var Array_Str = Str.split(',');
    logiccheckcode = Array_Str[logiccheckcode];
    var checkcode = Code.substring(17, 18);
    if (logiccheckcode != checkcode) {
      wx.showToast({
        title: '不是有效的统一社会信用编码！',
        icon: 'none'
      });
      return false;
    } else {
      return true;
    }
  }
}
//姓名
function regName(code, msg) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(code)) {
    wx.showToast({
      title: '法人姓名有误',
      icon: 'none'
    });
    return false;
  } else {
    return true;
  }
}

function checkAddres(address, deladdres) {

  if (address.provinceName) {
    if (deladdres) {
      return address.provinceName + '、' + address.cityName + '、' + address.areaName + deladdres;
    } else {
      wx.showToast({
        title: '请填写详细地址!',
        icon: 'none'
      })
    }
  } else {
    wx.showToast({
      title: '请选择省市区!',
      icon: 'none'
    })
  }
}

//发票信息-发票抬头
function invoicesAreRaised(code, msg) {
  if (!code) {
    wx.showToast({
      title: '请输入抬头发票',
      icon: 'none'
    });
    return false
  } else {
    return true
  }
}

//发票信息-纳税人识别号
function taxpayerNumber(code, msg) {
  if (!code) {
    wx.showToast({
      title: '请输入纳税人识别号',
      icon: 'none'
    });
    return false
  } else {
    return true
  }
}

//发票信息-注册地址
function registerAddres(code, msg) {
  if (!code) {
    wx.showToast({
      title: '请选择省市区',
      icon: 'none'
    });
    return false
  } else {
    return true
  }
}

//发票信息-银行账户
function bankAccount(code, msg) {
  //开头6位
  var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
  if (!code) {
    wx.showToast({
      title: '请输入银行账户',
      icon: 'none'
    });
    return false
  } else if (code.length < 16 || code.length > 19) {
    wx.showToast({
      title: '银行卡号长度必须在16到19之间',
      icon: 'none'
    });
    return false
  } else if (!Number(code)) {
    wx.showToast({
      title: '银行卡号必须全为数字',
      icon: 'none'
    });
    return false
  } else if (strBin.indexOf(code.substring(0, 2)) === -1) {
    wx.showToast({
      title: '银行卡号开头6位不符合规范',
      icon: 'none'
    });
    return false
  } else {
    return true
  }
}

//发票信息-收件人
function receiptPerson(code, msg) {
  if (!code) {
    wx.showToast({
      title: '请输入收件人',
      icon: 'none'
    });
    return false
  } else {
    return true
  }
}


module.exports = {
  checkPhone: checkPhone,
  checkRequired: checkRequired,
  checkPassword: checkPassword,
  CheckSocialCreditCode: CheckSocialCreditCode,
  regName: regName,
  checkAddres: checkAddres,
  invoicesAreRaised: invoicesAreRaised,
  taxpayerNumber: taxpayerNumber,
  registerAddres: registerAddres,
  bankAccount: bankAccount,
  receiptPerson: receiptPerson
};