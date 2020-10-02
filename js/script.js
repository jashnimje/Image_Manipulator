// Hide Color Picker byDefault
document.getElementById("colorPicked").style.visibility = "hidden";

// Navigation
function openNav() {
  document.getElementById("navbar").style.width = "250px";
}

function closeNav() {
  document.getElementById("navbar").style.width = "0";
}

/* Filters */
var image = null;
var fimage = null;
var canvas = document.getElementById("display");

function upload() {
  var file = document.getElementById("upload");
  image = new SimpleImage(file);
  fimage = new SimpleImage(file);
  image.drawTo(canvas);
}

// Image Size Details
function displayDetails() {
  if (imageIsLoaded(image)) {
    var details = "<b>Image Size:</b> ";
    var width = image.getWidth();
    var height = image.getHeight();
    details = details + width + " x " + height;
    var p = document.getElementById("imgDetails");
    p.innerHTML = details;
    p.style.visibility = "visible";
  }
}

function showHide() {
  var selectedValue = filter.value;
  if (selectedValue === "colorize") {
    document.getElementById("colorPicked").style.visibility = "visible";
  } else {
    document.getElementById("colorPicked").style.visibility = "hidden";
  }
}

// Filter Dropdown Menu
function filterSelect() {
  var e = document.getElementById("filter");
  var selected = e.value;
  fimage = new SimpleImage(image);
  if (imageIsLoaded(fimage)) {
    if (selected === "grayscale") {
      grayscale();
    } else if (selected === "sepia") {
      sepia();
    } else if (selected === "rainbow") {
      rainbow();
    } else if (selected === "red") {
      red();
    } else if (selected === "blur") {
      blur();
    } else if (selected === "windowPane") {
      windowPane();
    } else if (selected === "colorize") {
      colorize();
    } else {
      alert("Select Filter");
    }

    var canvas = document.getElementById("display");
    fimage.drawTo(canvas);
  }
}

function imageIsLoaded(img) {
  if (img == null || !img.complete()) {
    alert("Image not loaded");
    return false;
  } else {
    return true;
  }
}

function resetImg() {
  if (imageIsLoaded(image)) {
    image.drawTo(canvas);
    fimage = new SimpleImage(image);
  }
}

// grayscale
function grayscale() {
  for (var pixel of fimage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

// Sepia
function sepia() {
  for (var pixel of fimage.values()) {
    r = pixel.getRed();
    g = pixel.getGreen();
    b = pixel.getBlue();
    newRed = 0.393 * r + 0.769 * g + 0.189 * b;
    newGreen = 0.349 * r + 0.686 * g + 0.168 * b;
    newBlue = 0.272 * r + 0.534 * g + 0.131 * b;
    if (newRed > 255) {
      newRed = 255;
    } else if (newGreen > 255) {
      newGreen = 255;
    } else if (newBlue > 255) {
      newBlue = 255;
    }

    pixel.setRed(newRed);
    pixel.setGreen(newGreen);
    pixel.setBlue(newBlue);
  }
}

// Rainbow
function rainbow() {
  var height = fimage.getHeight();
  for (var pixel of fimage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 2) / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2 * avg - 51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 3) / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 4) / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < (height * 5) / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < (height * 6) / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(0.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      } else {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }
  }
}

// Red
function red() {
  for (var pixel of fimage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}

// Blur
function blur() {
  for (var pixel of fimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var num = Math.random();
    if (num < 0.5) {
      fimage.setPixel(x, y, pixel);
    } else {
      fimage.setPixel(x, y, getRandomPixel(x, y, 20));
    }
  }
}
function getRandomPixel(x, y, distance) {
  var randomX = x + Math.random() * distance;
  var randomY = y + Math.random() * distance;

  if (randomX < 0) {
    randomX = 0;
  }
  if (randomX > fimage.getWidth()) {
    randomX = fimage.getWidth() - 1;
  }
  if (randomY < 0) {
    randomY = 0;
  }
  if (randomY > fimage.getHeight()) {
    randomY = fimage.getHeight() - 1;
  }
  return fimage.getPixel(randomX, randomY);
}

//Window Pane
function windowPane() {
  for (var pixel of fimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();

    if (
      pixel.getX() < 40 ||
      (pixel.getX() < fimage.getWidth() &&
        pixel.getX() > fimage.getWidth() - 40) ||
      pixel.getY() < 40 ||
      (pixel.getY() < fimage.getHeight() &&
        pixel.getY() > fimage.getHeight() - 40) ||
      (pixel.getX() < fimage.getWidth() / 4 &&
        pixel.getX() > fimage.getWidth() / 4 - 30) ||
      (pixel.getX() < fimage.getWidth() / 2 &&
        pixel.getX() > fimage.getWidth() / 2 - 30) ||
      (pixel.getX() < (fimage.getWidth() * 3) / 4 &&
        pixel.getX() > (fimage.getWidth() * 3) / 4 - 30) ||
      (pixel.getY() < fimage.getHeight() / 2 &&
        pixel.getY() > fimage.getHeight() / 2 - 30)
    ) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(0);
    }
  }
}

// Colorize
function parseColor(RGB) {
  var color = document.getElementById("colorPicked").value;
  return parseInt(color.substr(RGB, 2), 16);
}
function calculateLow(color) {
  return color / 127.5;
}
function calculateHigh(color) {
  return 2 - color / 127.5;
}

function colorizePixel(avg, red, green, blue, pixel) {
  var redL = calculateLow(red);
  var redH = calculateHigh(red);
  var greenL = calculateLow(green);
  var greenH = calculateHigh(green);
  var blueL = calculateLow(blue);
  var blueH = calculateHigh(blue);
  if (avg < 128) {
    pixel.setRed(redL * avg);
    pixel.setGreen(greenL * avg);
    pixel.setBlue(blueL * avg);
  } else {
    pixel.setRed(redH * avg + 2 * red - 255);
    pixel.setGreen(greenH * avg + 2 * green - 255);
    pixel.setBlue(blueH * avg + 2 * blue - 255);
  }
}

//document.getElementById("element").style.display = "none";
function colorize() {
  for (var pixel of fimage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var red = parseColor(1);
    var green = parseColor(3);
    var blue = parseColor(5);
    colorizePixel(avg, red, green, blue, pixel);
  }
}

// Tabs
function features(evt, featureName) {
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(featureName).style.display = "block";
  evt.currentTarget.className += " active";
}

/* Green Screen */
var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("fgcan");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("bgcan");
  bgImage.drawTo(bgCanvas);
}

function createComposite() {
  // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  var greenThreshold = 240;
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      //pixel is green, use background
      var bgPixel = bgImage.getPixel(x, y);
      output.setPixel(x, y, bgPixel);
    } else {
      //pixel is not green, use foreground
      output.setPixel(x, y, pixel);
    }
  }
  return output;
}

function doGreenScreen() {
  //check that images are loaded
  if (fgImage == null || !fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || !bgImage.complete()) {
    alert("Background image not loaded");
  }
  // clear canvases
  clearCanvas();
  // call createComposite, which does green screen algorithm and returns a composite image
  var finalImage = createComposite();
  finalImage.drawTo(fgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
}
