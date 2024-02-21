bind = "0.0.0.0:8000"
module = "config.wsgi:application"

workers = 4 
worker_connections = 1000
threads = 4
