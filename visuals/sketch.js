let mic;
let patch = 1
function preload() {
  img1 = loadImage('imgs/img1.png');
  img2 = loadImage('imgs/img2.png');
  img3 = loadImage('imgs/img3.png');
  img4 = loadImage('imgs/img4.png');
}
function setup() {
  createCanvas(2500, 1500);

  // Create an Audio input
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  fft.setInput(mic);
  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    patch += 1;
  } else if (keyCode === RIGHT_ARROW) {
    patch -=1;
  }
}

let rows = 20
let rowStep = 2000/rows
let columns = 25
let colStep = 3000/columns
var shift = 0
function draw() {
  
  background(1000)
  fill(color(255, 204, 0));
  stroke(1000);

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  cx= mouseX
  cy = mouseY

  //patch 1
  if (patch == 1){
    frameRate(20)
    imageMode(CORNER);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++){
        let d = dist(j*rowStep, i*colStep, cx, cy)/500; // should be 0 closest 1 furthest
        val = d*100*(20*vol)
        if (val < 50){
          image(img2, j*rowStep,i*colStep, val*1.2,val*.6)
        }
        else if (val < 200){
          image(img1, j*rowStep,i*colStep, val*.7,val*.5)
        }
        else if (val < 400){
          image(img2, j*rowStep,i*colStep, val*.4,val*.2)
        }
        else if (val < 600){
          image(img1, j*rowStep,i*colStep, val*.4,val*.2)
        }
        else if (val < 800){
          image(img2, j*rowStep,i*colStep, val*.4,val*.2)
        }
      }
    }
  }

  if (patch == 2){
    frameRate(20)
    imageMode(CENTER);
    
    let spectrum = fft.analyze();
    let threeband = fft.linAverages(5);
    print(threeband)
    //let d = dist(j*rowStep, i*colStep, cx, cy)/500; // should be 0 closest 1 furthest
    val = 400+ vol*400
    
    let bass = threeband[1]/40
    let mids = threeband[2]/40
    let highs = threeband[3]/40
    for(let i = -10;i<10;i++){
      if (abs(i)%3==0){
        image(img4, i*350 + shift, 1000,150+100*bass,150+100*bass)
      }
      if (abs(i)%3==1){
        image(img2, i*350 + shift, 1000,150+100*mids,150+100*mids)
      }
      if (abs(i)%3==2){
        image(img3, i*350 + shift, 1000,150+100*highs,150+100*highs)
      }
    }

    for(let i = -20;i<20;i++){
      if (abs(i)%3==0){
        image(img4, 1000+i*350 - shift, 500,150+100*bass,150+100*bass)
      }
      if (abs(i)%3==1){
        image(img2, 1000+i*350 - shift, 500,150+100*mids,150+100*mids)
      }
      if (abs(i)%3==2){
        image(img3, 1000+i*350 - shift, 500,150+100*highs,150+100*highs)
      }
    }

    for(let i = -10;i<10;i++){
      if (abs(i)%3==0){
        image(img4, i*350 + shift, 250,150+100*bass,150+100*bass)
      }
      if (abs(i)%3==1){
        image(img2, i*350 + shift, 250,150+100*mids,150+100*mids)
      }
      if (abs(i)%3==2){
        image(img3, i*350 + shift, 250,150+100*highs,150+100*highs)
      }
    }

    for(let i = -20;i<20;i++){
      if (abs(i)%3==0){
        image(img4, 1000+i*350 - shift, 1250,150+100*bass,150+100*bass)
      }
      if (abs(i)%3==1){
        image(img2, 1000+i*350 - shift, 1250,150+100*mids,150+100*mids)
      }
      if (abs(i)%3==2){
        image(img3, 1000+i*350 - shift, 1250,150+100*highs,150+100*highs)
      }
    }

    val = val*1.5
    image(img1, width/2, height/2, val, 0.5*val);

    shift += 10
    shift %= width
  }
  // // Draw an ellipse with height based on volume
  // let h = map(vol, 0, 1, height, 0);
  // ellipse(width / 2, h - 25, 50, 50);
}
