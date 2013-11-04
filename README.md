easyform
========

一款轻量级的jQuery表单验证插件。
##Features
* 基于jQuery，兼容各种浏览器
* 使用简单，体积小
* 通过修改配置可以实现多种功能

##Usage

####首先你得在页面中引用jQuery和jquery.easyform.js
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/jquery.easyform.js"></script>
####最基本的用法
    $('form').easyform({
        fields : ['#input-email','.input-password'] //使用element的id或者className
    });
在表单submit的时候easyform会校验这些Element的指是否为空
####自己选择什么时候开始表单校验
    $('form').easyform({
        submitButton : '.submit-button'  //当点击button时校验表单
    });
####你也可以进行数据类型校验并且指定错误提示信息
    $('form').easyform({
        fields : {
            '#input-password' : {
                required : 'Email不能为空', //内容为空时显示的错误信息
                email : {
                    test : 'email', //我们提供email校验
                    message : 'Email格式不正确'
                }
            },
            '#input-password' : {
                required : '请输入密码'，
                mypassword : {  //自定义校验
                    test : /^[\w]{8,16}$/,
                    message : '密码长度为8-16'
                }
            }
        }
    });
####校验完成后执行回调函数
    $('form').easyform({
        submitButton : '.submit-button',
        success : function(){alert('easy to validate form');}
    });
####取消对对某些表单项的校验
    var easyform = $('form').easyform({
        fields : ['#input-email','.input-password','#input-title'] //使用element的id或者className
    });
    easyform.removeFields('#input-title');
####增加对某些表单项的校验
    var easyform = $('form').easyform({
    });
    easyform.addFields({
            '#input-email' : {
                required : 'Email不能为空', //内容为空时显示的错误信息
                email : {
                    test : 'email', //我们提供email校验
                    message : 'Email格式不正确'
                }
            },
            '#input-password' : {
                required : '请输入密码'，
                mypassword : {  //自定义校验
                    test : /^[\w]{5,16}$/,
                    message : '密码长度为8-16'
                }

            }
    });
    easyform.addFields('#input-title').addFields('#input-type');
    easyform.addFields(['#input-description','#input-price']);  //添加多项可以使用数组
