<?php
  include_once 'dbh.php';
  $var = $_GET['var_lp'];
  $sql = "SELECT * FROM license_plates WHERE licensePlate='$var';";
  $result = mysqli_query($conn, $sql);
  $s = mysqli_fetch_assoc($result)['startTime'];

  //will override old data if same qr code is scanned multiple times (qr code with same lp and start time)
  $sql = "DELETE FROM archive WHERE licensePlate ='$var' AND startTime='$s'"; //delete repeate entries with same startTime
  mysqli_query($conn, $sql);

  $sql = "INSERT INTO archive (licensePlate, startTime) VALUES ('$var', '$s');";
  mysqli_query($conn, $sql);

  $sql = "SELECT * FROM archive WHERE licensePlate ='$var' AND startTime='$s';";
  $result = mysqli_query($conn, $sql);

  $e = mysqli_fetch_assoc($result)['endTime'];
  echo $var," ", $s," ", $e;
