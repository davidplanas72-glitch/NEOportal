# Usar una imagen ligera de Nginx
FROM nginx:alpine

# Copiar el contenido del portal al directorio por defecto de Nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Nginx se inicia automáticamente al arrancar el contenedor
CMD ["nginx", "-g", "daemon off;"]
