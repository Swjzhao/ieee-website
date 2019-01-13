# ieee-website
IEEE website repository  

## Structure and Usage  
(Updated 2019-01) The `/var/www/html/public_html` simlink points to `~/ieee-website` folder, which directly pulls from this repo. Please contact Zining (`zining@cs.toronto.edu`) for access to this repo.  

## Useful scripts  
- To update the copyright statement (e.g., from 2019 to 2020):  
```
perl -pi -w -e 's/&copy; 2019 IEEE Univ/&copy; 2020 IEEE Univ/g' $( grep -rl '.html' )
```
