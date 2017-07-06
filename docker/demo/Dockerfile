FROM ubuntu:16.04

MAINTAINER "Li sheng <Lisheng0706@gmail.com>"

USER root

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# disable stdin to avoid 'dpkg-preconfigure: unable to re-open stdin'
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN apt-get update -y
RUN apt-get install build-essential libssl-dev -y
RUN apt-get install curl -y
# nvm and node version
ENV NVM_VERSION 0.25.0
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 6.9.4
# install nvm an node
RUN curl https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/v$NODE_VERSION/bin:$PATH
# inatall vim
RUN apt-get install -v vim
WORKDIR /root
