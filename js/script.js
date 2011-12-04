/* Author: codeninja_ru Mayorov Vitaliy

*/

yepnope([{
	load: "http://userapi.com/js/api/openapi.js?34",		
	complete: function() {
	    VK.init({apiId: 2628061, onlyWidgets: false});
		widget_vk_init();
	}
},
]);

yepnope(['http://platform.twitter.com/widgets.js'/*, 'https://apis.google.com/js/plusone.js'*/, 'http://connect.facebook.net/en_US/all.js#xfbml=1']);


yepnope({
    load: 'http://widgets.twimg.com/j/2/widget.js',
    complete: widget_twitter_init
})

function widget_vk_init() {
	VK.Widgets.Like("vk_like_kprf", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;КПРФ&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1001);
	
	VK.Widgets.Like("vk_like_ldpr", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию ЛДПР", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1002);
	
	VK.Widgets.Like("vk_like_er", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;Единая Россия&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1003);
	
	VK.Widgets.Like("vk_like_sr", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;Справедливая Россия&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1004);
	
	VK.Widgets.Like("vk_like_yabloko", {type: "mini", text: "Я голосую", pageTitle: "Я голосую за партию &laquo;ЯБЛОКО&raquo;", pageDescription: "Прими участие в правдивом интернет-голосовании."}, 1005);
	
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

function getVkApiCount(name, item_id) {
  return VK.Api.call('likes.getList', {
    type: 'sitepage',
    owner_id: 2628061,
    item_id: item_id
  }, function(r) {
  	if (r.response) addCounter(name, r.response.count);
	});
}

function calc_result() {
  $('.party').each(function (idx, item) {
    getTwitterCount(item);
    getVkCount(item);
    getFbCount(item);
    //getOdklCount(item);
  });  
}

function getTwitterCount(item) {
  var name = $(item).data('name');
  var url = 'http://rosizber.com/?party=' + name;
  url = encodeURIComponent(url);
  url = 'http://urls.api.twitter.com/1/urls/count.json?url=' + url + '&callback=?'
  $.getJSON(url, function (data) {
    addCounter(name, data.count);
  });

}

function getVkCount(item) { getVkApiCount($(item).data('name'), $(item).data('id')) }
function getFbCount(item) {
  var name = $(item).data('name');
  var url = 'http://rosizber.com/#party-' + name;
  url = encodeURIComponent(url);
  url = 'https://api.facebook.com/method/fql.query?query=select total_count from link_stat where url="' + url + '"&format=json&callback=?';
  $.getJSON(url, function (data) {
    addCounter(name, data[0].total_count);
  });
}

function getOdklCount(item) {
//http://www.odnoklassniki.ru/dk?st.cmd=extLike&uid=odklcnt0&ref=http%3A%2F%2Frosizber.com%2F%23party-kprf
}

function addCounter(party_name, count) {
  $('#party-'+party_name).data('count') = $('#party-'+party_name).data('count') + count;
  if (ResultData != false) {
    old_count = ResultData.getValue(party_name)
    ResultData.setValue(party_name, old_count + count); 
  }
}


// диаграмма с результатами  
var ResultData = false;
function drawChart() {

  ResultData = {
    data: new google.visualization.DataTable(), // рузльтаты опроса в сыром виде
    keys: {}, // соотвествие ключей и индексам масива
    addRow: function(name, title, count) {
        var idx = this.data.addRow([title, count]);
        this.keys[name] = idx - 1;
    },
    setValue: function(name, count) {
      if (this.keys[name] == undefined) {
        this.addRow(name, '', count);
      } else {
        this.data.setCell(this.keys[name], 1, count);
      } 
    },
    getValue: function(name) {
      return this.data.getValue(this.keys[name], 1);
    }
  };

  // Create the data table.
  ResultData.data.addColumn('string', 'Topping');
  ResultData.data.addColumn('number', 'Slices');
  $('.party').each(function (idx, item) {
      ResultData.addRow($(item).data('name'), $(item).find('h2').text().trim(), $(item).data('count'));
  });
  
  // Set chart options
  var options = {
                 'width':840,
                 'height':500,
                 'backgroundColor': 'transparent',
                 'fontSize': '14px',
                 'fontName': 'Helvetica',
                 'titleTextStyle': {color: '#333', fontName: 'Helvetica', fontSize: '18px'},
                 'colors': ['#F95757', '#579FF9', '#423EF8', '#F9A357', '#BAFB97', '#ECF957', '#BE57F9']
                };
  
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart'));
  chart.draw(ResultData.data, options);
}

yepnope({
    load: ['http://stg.odnoklassniki.ru/share/odkl_share.js'],
    complete: function() {
    	$(document).ready(function() {
    		ODKL.init();
			
			//показываем результаты в нужное время
			var now = new Date();
			var timeLimit = new Date(Date.parse('Dec 5, 2011'));
			if (now > timeLimit) $('body').addClass('show-results');
//        // хакаем кнопку одноглазников
//        var old_func = ODKL.updateCount;
//        ODKL.updateCount = function (id, count) {
//          var $party = $('#'+id).parents('.party');
//          var name = $party.data('name');
//          addCounter(name, count);
//          old_func(id, count);
//
//        }
//        google.setOnLoadCallback(drawChart);
    	 });
    }
})
