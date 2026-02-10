FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html
COPY logo.svg /usr/share/nginx/html/logo.svg

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
