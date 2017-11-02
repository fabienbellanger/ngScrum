FROM php:fpm

MAINTAINER Fabien Bellanger <valentil@gmail.com>

RUN apt-get update
RUN apt-get install -y

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Common
RUN apt-get update \
     && apt-get install -y \
         openssl \
         git

RUN apt-get install -y libicu-dev
RUN docker-php-ext-install intl

RUN apt-get install -y libmcrypt-dev
RUN docker-php-ext-install mcrypt

RUN apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng12-dev
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install gd

RUN apt-get update \
	&& apt-get install -y \
		vim \
		net-tools \
		procps \
		telnet \
        nano \
		netcat \
		unzip \
	&& rm -r /var/lib/apt/lists/*

# Install composer and put binary into $PATH
RUN curl -sS https://getcomposer.org/installer | php \
	&& mv composer.phar /usr/local/bin/ \
	&& ln -s /usr/local/bin/composer.phar /usr/local/bin/composer

# Install Xdebug
RUN curl -fsSL 'https://xdebug.org/files/xdebug-2.4.0.tgz' -o xdebug.tar.gz \
    && mkdir -p xdebug \
    && tar -xf xdebug.tar.gz -C xdebug --strip-components=1 \
    && rm xdebug.tar.gz \
    && ( \
    cd xdebug \
    && phpize \
    && ./configure --enable-xdebug \
    && make -j$(nproc) \
    && make install \
    ) \
    && rm -r xdebug \
    && docker-php-ext-enable xdebug

# On décommente les alias
RUN sed -i 's/# alias/alias/g' /root/.bashrc

WORKDIR /var/www/laravel
