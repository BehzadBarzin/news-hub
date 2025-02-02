# Use PHP 8.3
FROM php:8.3

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    supervisor \
    && docker-php-ext-install pdo_mysql zip mbstring exif pcntl bcmath opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy Laravel files
COPY ./api .

# TEMP: Remove .env explicitly to prevent it from being used
RUN rm -f .env
# Rename .env.docker to .env
RUN mv ./.env.docker ./.env

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Set permissions for Laravel storage and bootstrap cache
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Copy Supervisor configuration
COPY ./api/supervisord.conf /etc/supervisord.conf

# Make the start script executable
RUN chmod +x ./docker-start.sh

# Expose port 8000
EXPOSE 8000

# Start Apache and queue worker
# CMD bash -c "php artisan migrate:refresh --seed && php artisan serve --host=0.0.0.0"

# Start Supervisor
# CMD ["supervisord", "-c", "/etc/supervisord.conf"]

# Use the startup script
CMD ["./docker-start.sh"]
