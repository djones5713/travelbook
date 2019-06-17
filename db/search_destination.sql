select * from destinations
where country = $2
OR region = $1;