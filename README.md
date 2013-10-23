easyform
========

一款轻量级的jQuery表单验证插件
##Feature
* 基于jQuery，兼容各种浏览器
* 使用简单，体积小
* 通过修改配置可以实现多种功能    

##Usage

####首先你得在页面引用jQuery和jquery.easyform.js    
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/jquery.easyform.js"></script>
####最基本的用法
    $('form').easyform();
这样在表单submit的时候easyform会自动校验form内所有的输入框以及下拉列表是否为空
####自己选择什么时候开始表单校验
    $('form').easyform({
        submitButton : $('.submit-button')  //当点击button时校验表单
    });
####如果你想自己指定校验哪些内容
    $('form').easyform({
        fields : ['#input-email','.input-password'] //使用element的id或者className
    });
####你也可以指定错误提示信息
    $('form').easyform({
        fields : {
            '#input-email' : {
                required-message : 'Email不能为空', //内容为空时显示的错误信息
                email-message : 'Email格式不正确'   //
            },
            '#input-password' : {
                required-message : '请输入密码' //
            }
        }
    });
####某种特殊情况下，你想取消对某一项内容的验证
    var easyform = $('form').easyform({
        fields : ['#input-email','.input-password','#input-title'] //使用element的id或者className
    });
    easyform.removeField('#input-title');
