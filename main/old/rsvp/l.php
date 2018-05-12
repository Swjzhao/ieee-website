
<a href="g.php?eventid=<?=$_GET[eventid]?>">Group View</a> | <a href="e.php?eventid=<?=$_GET[eventid]?>">Spreadsheet</a> | <a href="l.php?eventid=<?=$_GET[eventid]?>">List View</a> 


<table>

<?php

if($_GET['eventid']) {

	include("db.php");

	$eventid = intval($_GET['eventid']);


	$qid = mysql_query("SELECT count(*) count FROM ieeersvp WHERE eventid='$eventid'");
	$result = mysql_fetch_array($qid);
	print "A total of $result[count] RSVPs\n";


	$qid = mysql_query("SELECT name, rsvptime, discipline, year, email FROM ieeersvp WHERE eventid='$eventid' ORDER BY rsvptime DESC");

	
	while ($result = mysql_fetch_array($qid)) {

		print "<tr><td width=150>$result[rsvptime]</td><td width=200>$result[name]</td><td width=200>$result[discipline]</td><td width=100>$result[year]</td><td width=250>$result[email]</td></tr>\n";

	}
}

?>

</table>



