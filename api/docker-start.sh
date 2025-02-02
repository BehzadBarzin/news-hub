#!/bin/bash

# Run migrations and seed the database
php artisan migrate:refresh --seed

# Start Supervisor
exec supervisord -c /etc/supervisord.conf
