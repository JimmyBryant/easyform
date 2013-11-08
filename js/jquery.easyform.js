/*
	jquery.easyform.js v0.1
	author : bitterg
	responsity : https://github.com/JimmyBryant/easyform
*/

(function($,window){

	var easyform = function(form,options){
		var fields = {},
			submitButton,
			success;

		if($.isPlainObject(options)){	//options为object
			submitButton = options.submitButton || null;
			success = typeof options.success === 'function'?options.success : null;
			if($.isArray(options.fields)){	//options.fields is array
				$.each(options.fields,function(index,value){
					fields[value] = {};
				});
			}else if($.isPlainObject(options.fields)){	//options.fields is object
				fields = options.fields;
			}else if(typeof options.fields === 'string'){	//options.fields is string
				fields[options.fields] = {};
			}
		}

		this.fields = fields;
		var self = this;
		function submitHandle(event){
			var flag1 = true,
				flag2 = true;
			$.each(self.fields,function(field,config){
				$(field).each(function(index,elem){
					if(!validate(elem,config)){
						flag1 = false;
					}
				});
			});
			flag2 = flag1&&success?success()===false?false : true : true;

			return flag1&&flag2;
		}

		form.each(function(){
			if(submitButton){
				$(submitButton,$(this)).bind('click',submitHandle);
			}else{
				$(this).bind('submit',submitHandle);
			}
		});

		bindBlurEvent(fields);	//bind blur event
		bindResizeEvent();	//reset style of error message when window resize
	};

	easyform.prototype.removeFields = function(fields){
		var self = this,
			oFields = self.fields,
			field;
		if($.isArray(fields)){
			$.each(fields, function(index, field) {
				if(oFields[field]){
					recover(field);
				}
			});
		}else if(typeof fields == 'string'){
			field = fields;
			recover(field);
		}

		function recover(field){
			delete oFields[field];
			$(field).removeClass('error').each(function(index,elem){
				removeError(elem);
				elem.easyformBlur = false;
			});
		}
		return self;
	};

	easyform.prototype.addFields = function(fields){
		var self = this,
			newFields = {};
		if($.isPlainObject(fields)){
			newFields = fields;
		}else if($.isArray(fields)){
			$.each(fields, function(index,field) {
				newFields[field] = {};
			});
		}else if(typeof fields === 'string'){
			var field = fields;
			newFields[field] = {};
		}
		bindBlurEvent(newFields);
		$.extend(self.fields, newFields);
		return self;
	};

	var bindBlurEvent = function(fields){
		$.each(fields, function(field,config) {	//onblur时校验表单元素
			$(field).each(function(index,elem){
				if(elem.easyformBlur)
					return;
				elem.easyformBlur = true;
				$(elem).bind('blur',function(){
					this.easyformBlur&&validate(this,config);
				});
			});
		});
	};

	var bindResizeEvent = function(){
		var rtimer = null;
		$(window).bind('resize',function(){
			clearTimeout(rtimer);
			rtimer = setTimeout(function(){
				$('.error').each(function(index,elem) {
					setErrorPosition(elem);
				});
			},200);
		});
	};

	var easyReg = {
		email : /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
		url : /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
	};


	var validate = function(elem,config){

		var	success = true,
			test = null,
			message = config.error||'内容不能为空',
			value = $.trim($(elem).val());

		if(value === ''){	//是否为空
			success = error(elem,message);
		}else{	//进行格式校验
			for(var item in config){
				if($.isPlainObject(config[item])){
					var testItem = config[item];
					test = typeof testItem.test=='string'?easyReg[testItem.test]:testItem.test;
					message = testItem.message || '数据格式错误';
					if(!test.test(value)){
						success = error(elem,message);
						break;
					}
				}
			}
		}

		success&&removeError(elem);	//验证通过
		return success;
	};

	var error = function(elem,message){
		if(elem.easyformError){
			elem.easyformError.find('.easyform-error-message').text(message);
		}else{
			var err = $('<div class="easyform-error"></div>'),
				errColor = 'rgb(215, 115, 115)',
				errWidth = 135,
				errStyle = 'display:none;position: absolute; background-color:'+errColor+'; color: #FFF; padding: 2px 8px; font-size: 13px; border-radius: 4px; line-height: 18px;',
				arrowStyle = 'position:absolute;width:0;height:0;line-height:0;border-width:5px;border-style:dashed solid dashed dashed;border-color:transparent '+errColor+' transparent transparent;top:6px;left:-10px;',
				mesStyle = 'display: block; width: '+errWidth+'px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;';

			err.html('<em style="'+arrowStyle+'"></em><span class="easyform-error-message" style="'+mesStyle+'">'+message+'</span>').appendTo($('body'));
			elem.easyformError = err;
			$(elem).addClass('error');
			err[0].style.cssText = errStyle;
			setErrorPosition(elem);
			err.fadeIn();
		}
		return false;
	};

	var removeError = function(elem){
		if(elem.easyformError){
			elem.easyformError.fadeOut(function(){$(this).remove();});
			elem.easyformError = null;
			$(elem).removeClass('error');
		}
	};

	var setErrorPosition = function(elem){
		var easyformError = elem.easyformError;
		if(!easyformError){
			return false;
		}
		var offset = $(elem).offset(),
			top = offset.top,
			left = offset.left,
			width = $(elem).outerWidth(),
			height = $(elem).outerHeight();

		easyformError.css({
			top :(top+(height-22)/2)+'px',
			left : (left+width+4)+'px'
		});
	};

	$.fn.easyform = function(options){
		return new easyform(this,options);
	};

})(this.jQuery,window);