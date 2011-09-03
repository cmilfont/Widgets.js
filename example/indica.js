(function($){
	$.fn.extend({
		breadcrumb: function(config) {
			var breadcrumb = $("<ul>");
			breadcrumb.addClass("breadcrumb");

			var length = config.list.length;

			for(var i = 0; i < length; i++) {
				
			}

			config.list.each(function(item){
				breadcrumb.append('<li style="z-index:4;"><a href="Home">' + + '</a></li>')
			});
				//.append('<li style="z-index:4;"><a href="Home">' + + '</a></li>')
				//.append('<li style="z-index:3;"><a href="#">Oportunidades</a></li>')
				//.append('<li style="z-index:2;"><a href="#">Meio</a></li>')
				//.append('<li style="z-index:1;" class="breadcrumb-last"><a href="#">Contatos</a></li>')
			$(this).append(breadcrumb)
		},
		globalMessage: function(msg, effect) {
			var $effect = effect || "shake";
			var $span = $(this).find("span");
			var newMsg = msg.substring(0, 56);
			$span.html(newMsg);
			if(msg.length > 56) {
				$("<a>")
					.attr("href", "#alerta")
					.html("...")
					.click(function(){
					 	/* TODO */
					})
					.appendTo($span);
			}
			$(this).show()//.effect($effect, {color:"#A1807B", times:3 }, 100);
			return this;
		}
	});
})(jQuery);



var coor;

$(function(){

	$("a[href='#closeGlobal']").click(function(){
	    $("#msg").hide()
	})

	$("a[href='#extrato']").click(function(){

		var coor_profile = $("#profile").offset();

		$("#conteudo").html("");


var outra = $("<div>")
outra
.css("position", "absolute")
.css("z-index", 1000)
.html("\
      <table id=\"newspaper-b\" > \
        <thead>\
          <tr>\
            <th>#</th>\
            <th>First Name</th>\
            <th>Last Name</th>\
            <th>Language</th>\
          </tr>\
        </thead>\
<tfoot>\
<tr>\
<td colspan=\"3\"><em>Total</em></td>\
<td><em>R$ 2000,00</em></td>\
</tr>\
</tfoot>\
        <tbody>\
          <tr>\
            <td>1</td>\
            <td>Some</td>\
            <td>One</td>\
            <td>English</td>\
          </tr>\
          <tr>\
            <td>2</td>\
            <td>Joe</td>\
            <td>Sixpack</td>\
            <td>English</td>\
          </tr>\
          <tr>\
            <td>3</td>\
            <td>Stu</td>\
            <td>Dent</td>\
            <td>Code</td>\
          </tr>\
        </tbody>\
      </table>\
")


		$("<div>")
			.addClass("extrato")
			.css("z-index", -1)
			.appendTo($("#conteudo"));

		$(".extrato")
		//.append(outra)
		.offset(coor_profile)
		.animate({top: -10 , left:-10}, 400, function() {
			outra.appendTo($("#conteudo"));
			/*
			Se precisar selecionar
			$("tr").click(function() {
				$("tr").css("background-color", "#E0E1DE");
				//$("tr").css("color", "#E0E1DE");
				$(this).css("background-color", "#2A353D");
				$(this).css("color", "#fff");

			});
			*/
		});

		

		return false;
	});

	$("a[href='#oportunidade']").click(function(){

		var coor_profile = $("#profile").offset();

		$("#conteudo").html("");

		$("<div>")
			.addClass("oportunidade")
			.css("z-index", -1)
			.append("<div class='fechar'>Fechar</div>")
			.appendTo($("#conteudo"));

		$(".oportunidade")
		.offset(coor_profile)
		.animate({top: -10 , left:-10}, 400)

		return false;
	});


	$("a[href='#home']").click(function(){
		$("#conteudo").html("");
		//$( "#limbo" ).dialog({position: [$("#conteudo").offset().left + 60, $("#profile").offset().top +20] });
		$( "#limbo" ).show().offset({top: $("#conteudo").offset().top + 20 , left:$("#conteudo").offset().left + 60})
		return false;
	});


})