#!/bin/bash
# Basic while loop
counter=1
while [ $counter -le 10 ]
do
curl -X GET http://127.0.0.1:3000/bulk-create
((counter++))
done
echo All done