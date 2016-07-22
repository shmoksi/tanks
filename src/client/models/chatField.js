var inv=1;

module.exports = function(){
    var adiv = document.getElementById('chat-window');
    var starttime;
    var maxOpacity=1;
    var timeDur=1000;

    function moveit(timestamp, el, dist, duration){
        var timestamp = timestamp || new Date().getTime();
        var runtime = timestamp - starttime;
        var progress = runtime / duration;

        progress = Math.min(progress, maxOpacity);
        el.style.opacity = inv*(dist * progress).toFixed(2);

        (inv==1) ? el.style.display="initial" : el.style.display="none";

        if (runtime < duration){
            requestAnimationFrame(function(timestamp){
                moveit(timestamp, el, dist, duration);
            })
        }
        else
            inv=-inv;
    }

    requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime();
        moveit(timestamp, adiv, maxOpacity, timeDur);
    });
}
