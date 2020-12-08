<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Marcellus+SC&family=Poiret+One&family=Raleway:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
    <title>Machu Cemetery</title>
    <link rel="stylesheet" href="styles/main.style.css">
  </head>
  <body>
    <div class="page">
      <div id="box1" class="box">
        <center>
          <img class="machu-logo" src="images/Machu_Thumb.jpg" />
        </center>
      </div>
      <div id="box2" class="box">
        <div class="banner">
            <div class="banner-title">Machu Cemetery</div>
        </div>
      </div>
      <div id="box3" class="box">
        <div class="nav">
          <div><a class="text" href="index.html" >Home</a></div>
          <div><a class="text" href="history.html" >History</a></div>
          <div><a class="text" href="gallery.html" >Gallery</a></div>
          <div><a class="text" href="contact_us.html" >Contact us</a></div>
          <div><a class="text" href="donations.html" >Donations</a></div>
          <div><a class="text" href="profile.html" >Search</a></div>
        </div>
      </div>
      <div id="box4" class="box">
        <div class="content-description">
          <p> Sorry<?php if($_POST['fname']) { echo " ".$_POST['fname']; } ?>, we cannot process your feedback at this time, but here's a picture from our picture gallery.</p>
          <div id="picture" class="gallery">
            <?php
             define('IMAGEPATH', 'images/gallery/');
             if (is_dir(IMAGEPATH)){
                 $handle = opendir(IMAGEPATH);
             }
             else{
                 echo 'No image directory';
             }

             $directoryfiles = array();
             while (($file = readdir($handle)) !== false) {
                 // $newfile = str_replace(' ', '_', $file);
                 // rename(IMAGEPATH . $file, IMAGEPATH . $newfile);
                 $directoryfiles[] = $file;
             }
             $random_index = rand(0,count($directoryfiles) - 1);
             $directoryfile = $directoryfiles[$random_index];

             echo '<img width="600px" src="' . IMAGEPATH . $directoryfile . '" alt="' . $directoryfile . '" />';
             // foreach($directoryfiles as $directoryfile){
             //     if(strlen($directoryfile) > 3 && !is_dir(IMAGEPATH . $directoryfile)) {
             //     echo '<img src="' . IMAGEPATH . $directoryfile . '" alt="' . $directoryfile . '" /> <br>';
             //     }
             // }

             closedir($handle);
             ?>
        </div>
      </div>
    </div>
  </body>
</html>
