FROM nginx:1.15-alpine

LABEL maintainer="Sangram Reddy <reddy.horcrux@gmail.com>"
LABEL application="rapido-build-web"

RUN mkdir /home/app && \
    rm -v /etc/nginx/nginx.conf

COPY ./config/nginx.conf /etc/nginx/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf && \
    rm -v /usr/share/nginx/html/index.html

ADD ./dist/rapido-web /usr/share/nginx/html/

RUN chmod -R 755 /usr/share/nginx/html/assets && \
    chmod -R 755 /usr/share/nginx/html/*

WORKDIR /home/app/

EXPOSE 80 443

CMD [ "/usr/sbin/nginx" ]
