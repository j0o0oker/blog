#nodejs练习------前台用原生，后台用node.js的博客
##KEY WORDS Node.js 后台渲染 blog-0.0.1
##项目分析

###功能
	用户注册，登陆，发文章，关注其他用户，管理自己的文章，收藏和点赞别人的文章；
###页面分类
	登陆页，注册页：用户登陆校验，注册新用户并保存到数据库。只要求填写用户名和密码，预设三个测试用户：textuser1&111，textuser2&222，textuser3&333;
	首页：展示其他用户的文章（标题，摘要，头像，作者），点击文章能查看文章详情，顶部做一个轮播图展示；
	详情页：展示文章具体内容，有收藏，点赞和关注功能；
	我的页：登陆信息，展示自己的关注，粉丝数，文章管理功能；
	文章管理页：文章删除功能；
###数据字典
	user_table
		ID							int   	 	 		pamaryKey
		username    				varchar 	 64 
		password					varchar		 64
		avator_src					varchar		 64
		fans						int			 10
		attention					int          10
	artical_table
		ID
		author
		title
		attract
##项目步骤

###建立数据库
###填写后台逻辑
#### 创建服务器连接

	
	