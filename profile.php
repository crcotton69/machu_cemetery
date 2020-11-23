<!DOCTYPE html>
<?php
  // $myfile = fopen("profiles.csv", "r") or die("Unable to open file!");
  $rc = 1;
  $data = array();
  if (($handle = fopen("profiles.csv", "r")) !== FALSE) {
      $header = fgetcsv($handle, 1000, ",");
      while ($header && ($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
	  $data[$row[0]."-".$row[3]] = $row;
          $rc++;
      }
      fclose($handle);
  }
?>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css2?family=Marcellus+SC&family=Poiret+One&family=Raleway:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">
    <title>Machu Cemetery</title>
    <link rel="stylesheet" href="styles/main.style.css">
    <link rel="stylesheet" href="styles/gallery.style.css">
    <style>
       .gallery {
	  display: grid;
	}
	.profile {
	}
	.dbox {
	  background-color: rgb(62, 32, 0);
	  color: beige;
	  border-radius: 10px;
	  border-color: blue;
	  border-style: solid;
	  border-width: 1px;
	}

	#profile-description {
	  color: yellow;
        }
    </style>
    <script type="text/javascript" src="fake_names.js"></script>
    <script type="text/javascript" src="navigation.js"></script>
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
          <div onmouseover=""><a href="main.html" >Home</a></div>
          <div onmouseover=""><a href="history.html" >History</a></div>
          <div onmouseover=""><a href="gallery.html" >Gallery</a></div>
          <div onmouseover=""><a href="contact_us.html" >Contact us</a></div>
          <div onmouseover=""><a href="support_us.html" >Support us</a></div>
        </div>
      </div>
      <div id="box4" class="box">
        <div class="gallery">
       	<?php 
         //if( ($id_param = $_GET['name']."-".$_GET['location']) && ($row = $data[$id]) ) {
         if( ($id_param = $_GET['name']) ) {
	   $pattern = "/".$id_param."/i";
	   foreach ($data as $id => $row) {
	     if (preg_match($pattern, $id)) {
	?>
	  <div class="profile">
          <div class="dbox">
            <span id="full-name">Name: <?php echo $row[0]?></span><br/>
            <span id="birth-date">Birthdate: <?php echo $row[1] ?></span> 
            <span id="date-of-death">Date of Death: <?php echo $row[2] ?></span><br/>
            <span id="profile-location">Location: "<?php echo $row[3] ?>" </span>
            <p id="profile-description">Description: "<?php echo $row[4] ?>" </p>
          </div>
	  <?php 
		$profile_pic_name = "images/profile_pics/".$row[0].".jpg";
		if (file_exists($profile_pic_name)) {
	  ?>
          <div class="profile-pic">
            <img src="<?php echo $profile_pic_name; ?>" alt="<?php echo $profile_pic_name; ?>" />
          </div>
	  <?php } ?>
	  </div>
       	<?php 
	    }
	  }
	}
	  unset($row);
	?> 
        </div>
      </div>
    </div>
  </body>
</html>
