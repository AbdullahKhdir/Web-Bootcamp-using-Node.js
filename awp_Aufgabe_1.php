<html>
  <head>
  </head>
  <body>



  <?php


  //$x = 1;

  $Daten = array();

  //if($x == 1)
  //{echo "Das war richtig!";}
  //else
  //{echo "Das war nicht okay";}

  //echo $x;



  for($y = 0; $y <= 10; $y++)
  {
  $Daten[$y] = $y;
  }



  echo "<table border ='1'>";

  echo "<tr>";

  for($x =0; $x<10 ; $x++)
  {
  echo "<td bgcolor='#ffaa55'>", $Daten[$x], "</td>";
  }
  echo "</tr>";
  echo "</table>";

  echo $x;


  ?>




  </body>

</html>
