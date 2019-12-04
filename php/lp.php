<?php
  include_once 'dbh.php';
  $first = $_POST['lp_num'];
  $first = str_replace(' ', '', $first); //delete whitespace
  $sql = "DELETE FROM license_plates WHERE licensePlate ='$first'";
  mysqli_query($conn, $sql);

  $sql = "INSERT INTO license_plates (licensePlate) VALUES ('$first');";
  mysqli_query($conn, $sql);
