FROM hyperf/hyperf:8.1-alpine-v3.18-swoole

# Instalar extensões necessárias
RUN apk add --no-cache \
    php81-pdo \
    php81-pdo_mysql \
    php81-mysqli \
    php81-json \
    php81-mbstring \
    php81-openssl \
    php81-tokenizer \
    php81-xml \
    php81-curl \
    php81-fileinfo \
    php81-posix \
    php81-sockets \
    php81-ctype \
    php81-session \
    php81-zip \
    php81-zlib \
    php81-dom \
    curl \
    git \
    unzip 

WORKDIR /app
