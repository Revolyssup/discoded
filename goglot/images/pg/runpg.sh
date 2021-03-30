touch $3
echo "$2 \q" | psql -U postgres --output=$3
echo "$3"
rm $3