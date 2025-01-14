FROM nginx:stable-alpine

COPY nginx_def.conf /etc/nginx/templates/default.conf.template

CMD [ "nginx", "-g", "daemon off;" ]
