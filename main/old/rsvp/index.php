<?php

if($_POST['rsvp']) {
	include("db.php");

	$eventid = intval($_GET['eventid']);
	$discipline = addslashes($_POST['discipline']);
	$year = addslashes($_POST['year']);
	$name = addslashes($_POST['name']);
	$email = addslashes($_POST['email']);

	mysql_query("INSERT INTO ieeersvp (eventid, rsvptime, discipline, year, name, email) VALUES($eventid, NOW(), '$discipline', '$year', '$name', '$email')");

	print "Thank you for your interest in the event. We have added you to our list.";

}


?>

