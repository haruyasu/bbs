$(function() {
    $(document).ready(function(){
        $('[data-toggle=offcanvas]').click(function() {
          	$(this).toggleClass('visible-xs text-center');
            $(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
            $('.row-offcanvas').toggleClass('active');
            $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
            $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
            $('#btnShow').toggle();
        });
    });

    var milkcocoa_con = new MilkCocoa('https://xxx.mlkcca.com:443');
    var ds = milkcocoa_con.dataStore('contact');
    var query = ds.query().sort("desc");

    query.done(function(data) {
        for (var i=0; i<data.length; i++) {
            var mes = '「' + data[i].name + '('+ data[i].email +')」さんから問い合わせ';
            var bodymes = data[i].body;
            bodymes = bodymes.replace(/\r?\n/g, ' ');
            var btn = "<button type=\"button\" id=\""+ data[i].id +"\" class=\"btndel btn btn-primary pull-right\">削除</button>";
            var panel = "<div class=\"panel panel-default\"><div class=\"panel-heading\">"+ btn +"<h4>"+ mes +"</h4></div><div class=\"panel-body\"><p>"+ bodymes +"</p></div></div>";
            $("#full").append(panel);
        }
    });

    $(document).on('click','.btndel',function(e) {
        var dataid = $(this).attr("id");
        ds.remove(dataid);
        location.reload();
    });

    ds.on('push', function(data) {
        location.reload();
    });

});
