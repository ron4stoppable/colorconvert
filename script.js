// Remember: Ctrl + Shift + M to minify!

var default_color = "#ff0023";
var default_text_lum = 'd';

function set_default(){
  setBackground(default_color, default_text_lum);
}

var hex_input = document.getElementById("hex-code");
hex_input.addEventListener('keyup', function(){
if(hex_input.value.length === 0){
    document.getElementById("rgb-code").value = '';
    set_default();
  }else if(hex_input.value.length > 0){
   document.getElementById("rgb-code").value = hex2rgb(hex_input.value) || '';
}
});

var rgb_input = document.getElementById("rgb-code");
rgb_input.addEventListener('keyup', function(){
if(rgb_input.value.length === 0){
    document.getElementById("hex-code").value = '';
  }else if(rgb_input.value.length > 0){
   document.getElementById("hex-code").value = hex2rgb(rgb_input.value) || '';
}
});

  function hex2rgb(color) {
    switch (color.length) {
      case 0: set_default();  break;
      case 3: if(color[0] !== '#' && (color[0] == 'a' || color[0] == 'b'  || color[0] == 'c' || color[0] == 'd' || color[0] == 'e' || color[0] == 'f' || (color[0] >= 0 && color[0] <= 255)) ){
              var r,g,b;
              r = parseInt(color.substring(0,1) + color.substring(0,1), 16);
              g = parseInt(color.substring(1,2) + color.substring(1,2), 16);
              b = parseInt(color.substring(2,3) + color.substring(2,3), 16);
              var rgb = "rgb("+r+","+g+","+b+")";
              var lum = checkBrightness(r,g,b);
              setBackground(rgb, lum);
              return rgb;
            }
       break;
      case 4: if(color[0] === '#'){
              var r,g,b;
              r = parseInt(color.substring(1,2) + color.substring(1,2), 16);
              g = parseInt(color.substring(2,3) + color.substring(2,3), 16);
              b = parseInt(color.substring(3,4) + color.substring(3,4), 16);
              var rgb = "rgb("+r+","+g+","+b+")";
              var lum = checkBrightness(r,g,b);
              setBackground(rgb, lum);
              return rgb;
            }
       break;
       case 6: if(color[0] !== '#' && (color[0] == 'a' || color[0] == 'b'  || color[0] == 'c' || color[0] == 'd' || color[0] == 'e' || color[0] == 'f' || (color[0] >= 0 && color[0] <= 255)) ){
                 var r,g,b;
                 r = parseInt(color.substring(0,2), 16);
                 g = parseInt(color.substring(2,4), 16);
                 b = parseInt(color.substring(4,6), 16);
                 var rgb = "rgb("+r+","+g+","+b+")";
                 var lum = checkBrightness(r,g,b);
                 setBackground(rgb, lum);
                 return rgb;
               }
        break;
        case 7: if(color[0] === '#'){
                var r,g,b;
                r = parseInt(color.substring(1,3), 16);
                g = parseInt(color.substring(3,5), 16);
                b = parseInt(color.substring(5,7), 16);
                var rgb = "rgb("+r+","+g+","+b+")";
                var lum = checkBrightness(r,g,b);
                setBackground(rgb, lum);
                return rgb;
              }
      break;
      default: return null;
    }
  }

  function rgb2hex(color){
    function convert(rgb){
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      var r = (parseInt(rgb[1],16).toString(16));
      var g = (parseInt(rgb[2],16).toString(16));
      var b = (parseInt(rgb[3],16).toString(16));
      var lum = checkBrightness(r,g,b);

      var hex = (rgb && rgb.length === 4) ? "#" +
       ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
       ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
       ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
       setBackground(hex, lum);
       return hex;
    }

    if(color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)){
      convert(rgb);
    } else if (color.match(/^[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) {
      convert("rgb"+color);
    } else if (color.match(/^[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) {
      convert("rgb("+color);
    }
   return null;
  }

function checkBrightness(r,g,b) {
  brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness < 125) {
    // white text
    return 'd';
    console.log("dark");
  } else {
    // black text
    console.log("light");
    return 'l';
  }
}

function setBackground(color, lum) {
  console.log(color+" : "+lum);
  if(lum === 'l'){
    var textView = document.querySelectorAll(".textView");
    for (var i = 0; i < textView.length; i++) {
      textView[i].classList.add("dark");
      textView[i].classList.remove("light");
    }

  }else{
    var textView = document.querySelectorAll(".textView");
    for (var i = 0; i < textView.length; i++) {
      textView[i].classList.add("light");
      textView[i].classList.remove("dark");
    }
  }
  document.getElementById("background").style.backgroundColor = color;
}
