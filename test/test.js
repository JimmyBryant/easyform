module('easyform validate',{
  setup: function() {
    fixture('<input type="text" id="email" name="email"/><input type="password" id="password"/><input id="submit" type="button" value="登录"/>');
  },
  teardown: function() {
  	$('.easyform-error').remove();	//移除错误提示信息
  }
});

function fixture(html) {
    return $('#qunit-fixture').html('<form>' + html + '</form>').find('form');
}
function fill(email,password){
	$('#email').val(email);
	$('#password').val(password);
}

test('基本校验', function() {
	$('form').easyform({
		fields : ['#email','#password']
	});
	$('form').trigger('submit');
	equal($('.error').length,2,'input1 has not passed');
});

test('自定义错误信息以及email格式校验',function(){
	var errMes = '邮箱不能为空',
		emailMes = '邮箱格式不正确';
	$('form').easyform({
		fields : {
			'#email' : {
				"error" : errMes,
				"validateEmail" : {
					"test" : 'email',
					"message" : emailMes
				}
			}
		}
	});
	$('form').trigger('submit');
	equal($('#email')[0].easyformError.find('span').text(),errMes,errMes);
	$('#email').val('some text');
	$('form').trigger('submit');
	equal($('#email')[0].easyformError.find('span').text(),emailMes,emailMes);
});
test('指定button触发校验',function(){
	var easyform = 	$('form').easyform({
		submitButton : '#submit',
		fields : ['#email','#password']
	});
	$('#submit').trigger('click');
	equal($('.error').length,2,'点击button开始校验');
});
test('动态添加、删除校验项',function(){
	var easyform = 	$('form').easyform({});
	easyform.addFields(['#password','#email']);
	$('form').trigger('submit');
	equal($('.error').length,2,'添加校验项成功');
	easyform.removeFields(['#password']);
	equal($('.error').length,1,'被删除的校验项错误提示成功消失');
	$('#password').trigger('blur');
	ok(!$('#password').hasClass('.error'),'被删除的校onblur也不会进行校验');
	$('form').trigger('submit');
	equal($('.error').length,1,'submit时被删除项也不会进行校验');
	easyform.addFields(['#password']);
	$('#password').trigger('blur');
	equal($('.error').length,2,'addFields password,onblur时进行校验');
});
test('校验成功执行回调函数',function(){
	var errMes = '邮箱不能为空',
		emailMes = '邮箱格式不正确';
	fill('admin@ss.cn',123456);
	var success = false;
	$('form').easyform({
		fields : {
			'#email' : {
				error : errMes,
				'validateEmail' :{
					test : 'email',
					message : emailMes
				}
			}
		},
		success :  function(){
			alert('校验成功');
			success = true;
			return false;
		}
	});
	$('form').trigger('submit');
	ok(success,'回调函数执行成功');
})
