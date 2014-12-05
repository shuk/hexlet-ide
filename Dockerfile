FROM node:0.10.32-onbuild

RUN npm install -g bower \
                   gulp

RUN bower install --allow-root
RUN gulp bower-copy
RUN gulp prepublish
