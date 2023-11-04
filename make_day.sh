#!/bin/bash

dayNumber=$1
cp -r ./days/day00 ./days/day$dayNumber
echo "Don't forget to add your new route to index.js:"
echo "app.use('/day$dayNumber', require('./days/day$dayNumber/route'));"
