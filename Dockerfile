FROM node:0.10.32-onbuild

# RUN mkdir -p /data
# WORKDIR /data

# COPY package.json /data/
# RUN npm install
# COPY . /data

# VOLUME /data

# CMD [ "npm", "start" ]

# WORKDIR /usr/src/app/node

# RUN curl -fsO http://nodejs.org/dist/v0.10.32/node-v0.10.32-linux-x64.tar.gz \
#     && tar xfvz node-v0.10.32-linux-x64.tar.gz -C .

# ENV PATH /usr/src/app/node/bin:$PATH

# WORKDIR /usr/src/app
