/* Author: codeninja_ru Mayorov Vitaliy

*/

yepnope([{
	load: "http://userapi.com/js/api/openapi.js?34",		
	complete: function() {
	    VK.init({apiId: 2628061, onlyWidgets: true});
		widget_vk_init();
	}
},
]);

yepnope(['http://platform.twitter.com/widgets.js', 'https://apis.google.com/js/plusone.js', 'http://connect.facebook.net/en_US/all.js#xfbml=1' , 'http://stg.odnoklassniki.ru/share/odkl_share.js']);

yepnope({
    load: 'http://widgets.twimg.com/j/2/widget.js',
    complete: widget_twitter_init
})

function widget_vk_init() {
	VK.Widgets.Like("vk_like_kprf", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;КПРФ&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1001);
	
	VK.Widgets.Like("vk_like_ldpr", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию ЛДПР", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1002);
	
	VK.Widgets.Like("vk_like_er", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;Единая Россия&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1003);
	
	VK.Widgets.Like("vk_like_sr", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;Справедливая Россия&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1004);
	
	VK.Widgets.Like("vk_like_yabloko", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;ЯБЛОКО&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1003);
	
	VK.Widgets.Like("vk_like_pr", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;Патриоты России&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1006);
	
	VK.Widgets.Like("vk_like_pd", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;Правое дело&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1007);
	
	VK.Widgets.Comments("vk_comments", {limit: 10, width: "460", attach: false});
}

function widget_twitter_init() {
				new TWTR.Widget({
				  id: 'twitter-news',
				  version: 2,
				  type: 'search',
				  search: 'выборы дума',
				  interval: 30000,
				  title: 'Твиттер о выборах',
				  subject: '',
				  width: 'auto',
				  height: 500,
				  theme: {
				    shell: {
				      background: '#8ec1da',
				      color: '#ffffff'
				    },
				    tweets: {
				      background: '#ffffff',
				      color: '#444444',
				      links: '#1985b5'
				    }
				  },
				  features: {
				    scrollbar: false,
				    loop: true,
				    live: true,
				    hashtags: true,
				    timestamp: true,
				    avatars: true,
				    toptweets: true,
				    behavior: 'default'
				  }
				}).render().start();
}
