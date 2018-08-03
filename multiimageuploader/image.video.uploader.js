$(document).ready(function(){


    var count = $(".album-thumnail li").length;
    var vdoCount = 0;
    var imgCount = 5;
    console.log(count);
    var getFirstImg = null;
    var names = [];
    var uploader = '<li><div class="album-thumnail"><i class="fa fa-plus"></i><input type="file" accept="image/*,video/*" name="thumbnail[]" data-container="#album" class="album-uploader" multiple="" id="album-add" title=""></div></li>';
    $(document).on('change', 'input[name="thumbnail[]"]', function(event) {
        var ele = $(this);
        var files = event.target.files;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.type.match('image')) {
                //check file size 1 mb maximum
                if (file.size >= 1 * 1024 * 1024) {
                    $('#media-err').show().text(string.img_size_err);
                    $('#media-err').fadeOut(6000)
                    return false;;
                }
                //5 max image or video allow
                if (count == 6) {
                    $('#media-err').show().text(string.five_imge_max_err);
                    $('#media-err').fadeOut(6000)
                    return false;;
                }

                console.log(count);
                if (imgCount > 0) {
                    console.log("in image");
                    var picReader = new FileReader();
                    picReader.fileName = file.name
                    picReader.addEventListener("load", function(event) {
                        var picFile = event.target;
                        $(ele).after('<div class="albub-item" title="' + picFile.fileName + '"><img src="' + picFile.result + '"></div><span class="remove-item"><i class="fa fa-times"></i></span>');
                        if (count < 5) {
                            $('#album').append(uploader);
                            count++;
                        }
                    });
                    imgCount--;
                    console.log('image count',imgCount);
                     console.log('Total count',count);
                } else {
                    $('#media-err').show().text("Only 5 images are allowed");
                    $('#media-err').fadeOut(6000)
                    return false;;
                }

            } else if (file.type.match('video')) {

                //file size check
                if (file.size >= 50 * 1024 * 1024) {
                    $('#media-err').show().text(string.video_size_err);
                    $('#media-err').fadeOut(6000)
                    return false;;
                }

                //5 max image or video allow
                if (count == 6) {
                    $('#media-err').show().text(string.five_imge_max_err);
                    $('#media-err').fadeOut(6000)
                    return false;
                }

                console.log(count);
                if (vdoCount < 1) {
                    console.log("in video");
                    var picReader = new FileReader();
                    picReader.fileName = file.name
                    picReader.addEventListener("load", function(event) {
                        var picFile = event.target;
                        console.log(picFile.fileName)
                        $(ele).after('<div class="albub-item" title="' + picFile.fileName + '"><video src="' + picFile.result + '" id="video" type="video/mp4"></video><canvas id="canvas" style="height:90px; width: 90px"></canvas></div><span class="remove-item rv"><i class="fa fa-times"></i></span><span class="player"><i class="fa fa-play-circle"></i></span>');
                        if (count < 5) {
                            $('#album').append(uploader);
                            count++
                        }

                        vdoCount++;
                    });
                    console.log('Video count',vdoCount);
                     console.log(' total count',count);
                    //count++;
                } else {
                    $('#media-err').show().text("Only 1 video is allowed");
                    $('#media-err').fadeOut(6000);
                    return false;
                }

                setTimeout(function() {
                    capture();
                }, 1000)
            }
            picReader.readAsDataURL(file);
        }
    });

    $('body').on('click', '.remove-item', function() {

        if ($(this).hasClass("rv")) {
            count--;
            console.log("video remove");

            vdoCount = 0;
            console.log(count, vdoCount, imgCount);
            $(this).parents('li').remove();
            if (count == 4) {
                $('#album').append(uploader);
            }
        } else {
            count--;
            console.log("image remove");

            imgCount++;
            console.log(count, vdoCount, imgCount);
            $(this).parents('li').remove();
            if (count == 4) {
                $('#album').append(uploader);
            }
        }



    });



    function capture() {
        var canvas = $(document).find("#canvas");
        var video = $(document).find("#video");
        $("#video").get(0).play();
        setTimeout(function() {
                $("#video").get(0).pause();
            }, 2000)
            // console.log(canvas, video);
            // canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    }

});