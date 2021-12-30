#/bin/bash

cd conf.d && kubectl create configmap react-appid-ui-nginx-config -n dev \
--from-file=default.conf