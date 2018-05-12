<?php

header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"rsvp.csv\"");

if($_GET['eventid']) {

	include("db.php");

	$eventid = intval($_GET['eventid']);

	$qid = mysql_query("SELECT name, rsvptime, discipline, year, email FROM ieeersvp WHERE eventid='$eventid' ORDER BY rsvptime DESC");

	
	while ($result = mysql_fetch_array($qid)) {

		print "\"$result[rsvptime]\",\"$result[name]\",\"$result[discipline]\",\"$result[year]\",\"$result[email]\"\n";

	}
}

?>

