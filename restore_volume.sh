#!/bin/bash
# Name: restore_volume.sh 
# Description: target side script
# Author: HUO Zhengjun
# Version: 1.0.3
# Date: 17/11/2016
#

CREDENTIAL_PATH=/root/Openstack/admin-openrc.sh
METADATA_LOCATION=/tmp/metadata-

#if [ $# -ne 1 ]; then
#	echo "Usage: $0 <SRC_VOLUME_ID> <SRC_VOLUME_BACKUP_SIZE> <SRC_VOLUME_BACKUP_ID>" && exit 0
#fi

if [ -e ${CREDENTIAL_PATH} ];then
	source ${CREDENTIAL_PATH}
else
	echo "Can't find credential file, quit" && exit -1
fi

METADATA_PATH=${METADATA_LOCATION}${1}
DISPLAY_NAME=COPY-${1}

echo "--> Import backup info:"
cinder backup-import cinder.backup.drivers.nfs $(tr -d '\n' < ${METADATA_PATH})
echo "--> Create empty volume:"
cinder create --display_name ${DISPLAY_NAME} ${2}	
TRGT_VOLUME_ID=`cinder list | grep -w ${DISPLAY_NAME} | awk -F'|' '{ print $2 }' | awk -F' ' '{ print $1 }'`
echo "--> Restore the backup volume:"
cinder backup-restore --volume ${TRGT_VOLUME_ID} ${3}
