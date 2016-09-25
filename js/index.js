/**
 * Created by 周杨 on 2016/8/13.
 */


window.onload=function() {
    var total = 17;
    var zWin = $(window);
    var render = function () {
        var padding = 2;
        var winWidth = zWin.width();
        var picWidth = Math.floor((winWidth - padding * 3) / 4);
        var tmpl = "";
        for (var i = 1; i <= total; i++) {
            var imgSrc = 'images/' + i + '.jpg';
            var p = padding;
            if (i % 4 == 1) {
                p = 0
            }
            tmpl += '<li data-id="' + i + '" class="animated bounceIn" style="width:' + picWidth + 'px;height:' +
                picWidth + 'px;padding-left:' + p + 'px;padding-top:' +
                padding + 'px;"><canvas id="canvas_' + i + '"></canvas></li>';
            var imageObj = new Image();
            imageObj.index = i;
            imageObj.onload = function () {
                /*$('#cvs_'+this.index)取到的是一个jquery对象 ；
                 通过取他的第一下标元素就可以获取到他的原生对象呀。
                 所以  $('#cvs_1')[0]   ==  document.getElementById('cvs_1')*/
                var canvas = $('#canvas_' + this.index)[0].getContext('2d');
                $('#canvas_' + this.index)[0].width = this.width;
                $('#canvas_' + this.index)[0].height = this.height;
                canvas.drawImage(this, 0, 0, picWidth, picWidth);
            };
            imageObj.src = imgSrc;
        }
        $('#container').html(tmpl);
    };
    render();
    var wImage = $('#large_img');
    var domImage = wImage[0];

    var loadImg = function (id, callback) {
        $('#container').css({height: zWin.height(), 'overflow': 'hidden'});
        $('#large_container').css({
            width: zWin.width(),
            height: zWin.height()
            //top:$(window).scrollTop()
        }).show();
        var imgsrc = 'images/' + id + '.large.jpg';
        var ImageObj = new Image();
        ImageObj.src = imgsrc;
        ImageObj.onload = function () {
            var w = this.width;
            var h = this.height;
            var winWidth = zWin.width();
            var winHeight = zWin.height();
            var realw = parseInt((winWidth - winHeight * w / h) / 2);
            var realh = parseInt((winHeight - winWidth * h / w) / 2);

            wImage.css('width', 'auto').css('height', 'auto');
            wImage.css('padding-left', '0px').css('padding-top', '0px');
            if (h / w > 1.2) {
                wImage.attr('src', imgsrc).css('height', winHeight).css('padding-left', realw + 'px');
            } else {
                wImage.attr('src', imgsrc).css('width', winWidth).css('padding-top', realh + 'px');
            }

            callback && callback();
        }


    };
    $('#container').delegate('li', 'tap', function () {
        var _id = cid = $(this).attr('data-id');
        loadImg(_id);
    });
    $('#large_container').tap(function(){

        $(this).hide();

    }).swipeLeft(function(){

        cid++;

        if(cid>total){

            cid=total;

        }

        else{

            loadImg(cid,function(){

                domImage.addEventListener('webkitAnimationEnd',function(){

                    wImage.removeClass('animated bounceInRight');

                    domImage.removeEventListener('webkitAnimationEnd');

                },false);

                wImage.addClass('animated bounceInRight');

            });

        }

    }).swipeRight(function(){

        cid--;

        if(cid<1){

            cid=1;

        }

        else{

            loadImg(cid,function(){

                domImage.addEventListener('webkitAnimationEnd',function(){

                    wImage.removeClass('animated bounceInLeft');

                    domImage.removeEventListener('webkitAnimationEnd');

                },false);

                wImage.addClass('animated bounceInLeft');

            });

        }

    });
};
