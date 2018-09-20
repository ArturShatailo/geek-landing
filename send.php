<?php
    
$i = 0;
foreach ($_POST as $item) {
 $hub[$i] = $item;
    $i++;
}
$price = $hub[1];
$name = $hub[2];
$amount = $hub[0];
$from = $hub[3];
$phone = $hub[4];

$to = "arturshatailo@gmail.com";
$subject = "Message from the web-site contact form";
$subject2 = "Copy of your form submission";
$headers = "From:" . $from;
$headers2 = "From:" . $to;

$message = "The client ".$from.":"."\n"."telephone number: ".$phone."\n"."sent a purchase request: ". $name ." (". $amount ."). The price of the one item: " . $price . "." ; 
$message2 = "We received your request for ". $name ." (". $amount ."). The price of the one item: " . $price . "\n"."Thank you for your time. We will contact you as soon as your request will be processed." ;

mail($to,$subject,$message,$headers);
mail($from,$subject2,$message2,$headers2);

?>

<link rel="stylesheet" type="text/css" href="css/style.css">;
