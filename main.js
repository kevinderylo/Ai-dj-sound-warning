var song="";
var song2="";
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;

rightwristX=0;
rightwristY=0;
function preload(){
    song=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video, modelloaded);

    posenet.on('pose', gotposes);
}

function draw(){
    image(video, 0, 0, 600, 500);
    
    if(scoreleftwrist>0.2){
        song2.stop();
        song.stop();
        fill("red");
        stroke("red");
        circle(leftwristX, leftwristY, 25);
       
        song.play();
        
    }
    if(scorerightwrist>0.2){
        song.stop();
        song2.stop();
        fill("red");
        stroke("red");
        circle(rightwristX, rightwristY, 25);
       
        song2.play();
        
    }
}


function modelloaded(){
    console.log("PoseNet is Initialized");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;

        scorerightwrist=results[0].pose.keypoints[10].score;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;

        console.log("Left Wrist X and Y is "+leftwristX+", "+leftwristY+". Right Wrist X and Y is "+rightwristX+", "+rightwristY+".")
        
    }
}