
<form method=post>
  <textarea name="title" width=50></textarea><br>
  <input type="submit" name="addevent" value="Add new event for RSVP">
</form>

<?php

if($_POST["addevent"]) {
	include("db.php");
	
	mysql_query("INSERT INTO ieeeevent (eventid, title) VALUES(NULL, \"$_POST[title]\")") or die(mysql_error());

	$eventid = mysql_insert_id();

$output =  <<< EOF
<table>
<form method="post" action="/rsvp/?eventid=$eventid">
	<tr><td>Name:</td> <td><input type="text" name="name" /></td></tr>
	<tr><td>Discipline: </td> <td><select name="discipline">
		<option value="">select your program</option>
		<option value="Engineering - Chemical">Engineering - Chemical</option>
		<option value="Engineering - Civil">Engineering - Civil</option>
		<option value="Engineering - Computer">Engineering - Computer</option>
		<option value="Engineering - Electrical">Engineering - Electrical</option>
		<option value="Engineering - EngSci">Engineering - EngSci</option>
		<option value="Engineering - Environmental">Engineering - Environmental</option>
		<option value="Engineering - Industrial">Engineering - Industrial</option>
		<option value="Engineering - Materials">Engineering - Materials</option>
		<option value="Engineering - Mechanical">Engineering - Mechanical</option>
		<option value="Engineering - Mineral">Engineering - Mineral</option>
		<option value="Engineering - Other">Engineering - Other</option>
		<option value="Arts and Science - Computer">Arts and Science - Computer</option>
		<option value="Arts and Science - Commerce">Arts and Science - Commerce</option>
		<option value="Arts and Science - Other">Arts and Science - Other</option>
		<option value="Other">Other</option>
	</select></td></tr>
	<tr><td>Year: </td> <td><select name="year">
		<option value="">select your year</option>
		<option value="1st Year">1st Year</option>
		<option value="2nd Year">2nd Year</option>
		<option value="3rd Year">3rd Year</option>
		<option value="PEY">PEY</option>
		<option value="4th Year">4th Year</option>
		<option value="Master">Master in Progress</option>
		<option value="PhD">PhD in Progress</option>
		<option value="Faculty">Faculty</option>
		<option value="Alumni">Alumni</option>
	</select></td></tr>
	<tr><td>Email: </td> <td><input type="text" name="email" size="50" /></td></tr>
	<tr><td colspan="2"><input type="submit" name="rsvp" value="I would like to attend this event"></td></tr>
</form>
</table>
EOF;

	print htmlspecialchars($output);

}


?>

