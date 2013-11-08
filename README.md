easyform
========

一款轻量级的jQuery表单验证插件。

##Features
* 基于jQuery，兼容各种浏览器
* 体积小,.min文件不到3K
* 修改js配置就可以实现复杂的表单校验
* 错误提示信息不会破坏表单结构
* 支持回调函数、异步提交表单

##Usage

####首先你得在页面中引用jQuery和jquery.easyform.js
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/jquery.easyform.js"></script>
####最基本的用法
    $('form').easyform({
        fields : ['#input-email','.input-password'] //使用element的id或者className
    });
在表单submit的时候easyform会校验这些Element的value是否为空
####也许你想在点击某个button的时候就校验表单，这个时候你需要指定submit button
    $('form').easyform({
        submitButton : '.submit-button'  //当点击button时校验表单
    });
####你也可以进行数据类型校验并且自定义错误提示信息
    $('form').easyform({
        fields : {
            '#input-password' : {
                error : 'Email不能为空', //内容为空时显示的错误信息
                email : {
                    test : 'email', //我们提供两种基本的数据格式校验，'email'、'url'
                    message : 'Email格式不正确'
                }
            },
            '#input-password' : {
                error : '请输入密码'，
                mypassword : {  
                    test : /^[\w]{8,16}$/,  //同样你也可以使用正则完成特殊的数据格式校验
                    message : '密码长度为8-16'
                }
            }
        }
    });
####校验成功后执行回调函数
    $('form').easyform({
        submitButton : '.submit-button',
        success : function(){
            alert('easy to validate form'); //校验成功后执行回调函数，表单仍然会提交
        }
    });
    $('form').easyform({
        submitButton : '.submit-button',
        success : function(){   //如果想要阻止表单提交,回调函数return false就可以
            alert('easy to validate form');
            return false;
        }
    });
####取消对对某些表单项的校验
    var easyform = $('form').easyform({
        fields : ['#input-email','#input-password','#input-title'] //使用element的id或者className
    });
    easyform.removeFields('#input-title');
    easyform.removeFields(['#input-email','#input-password']);
####增加对某些表单项的校验
    var easyform = $('form').easyform({
    });
    easyform.addFields({
            '#input-email' : {
                error : 'Email不能为空', //内容为空时显示的错误信息
                email : {
                    test : 'email', //我们提供email校验
                    message : 'Email格式不正确'
                }
            },
            '#input-password' : {
                error : '请输入密码'，
                mypassword : {  //自定义校验
                    test : /^[\w]{5,16}$/,
                    message : '密码长度为8-16'
                }

            }
    });
    easyform.addFields('#input-title');
    easyform.addFields(['#input-description','#input-price']);  //添加多项可以使用数组
