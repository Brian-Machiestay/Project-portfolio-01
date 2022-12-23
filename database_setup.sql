-- prepares a database to hold the data
CREATE database IF NOT EXISTS ghana_roads;
CREATE USER IF NOT EXISTS 'engineer'@'localhost' IDENTIFIED BY 'development';
GRANT ALL PRIVILEGES ON 'ghana_roads'.* TO 'engineer'@'localhost';
GRANT SELECT ON 'performance_schema'.* TO 'engineer'@'localhost';
FLUSH PRIVILEGES;
