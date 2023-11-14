#!/bin/bash
# Name: move_volume_between_platform.sh 
# Description: source side script, use restore_volume.sh on the other side 
# Author: HUO Zhengjun
# Version: 1.0.3
# Date: 17/11/2016
#

CREDENTIAL_PATH=/root/Openstack/admin-openrc.sh
CINDER_VOLUME_UUID=2c41ed56b3c4011ab9912543cc4abf2c
CINDER_VOLUME_LOCATION=/var/lib/cinder/mnt/${CINDER_VOLUME_UUID}/volume-
METADATA_LOCATION=/tmp/metadata-

DEST_HOST=10.0.150.51
DEST_SCRIPT_PATH=/root/Openstack/restore_volume.sh

if [ $# -ne 1 ]; then
	echo "Usage: $0 <INSTANCE_NAME>|<INSTANCE_ID>" && exit 0
fi

if [ -e ${CREDENTIAL_PATH} ];then
	source ${CREDENTIAL_PATH}
else
	echo "Can't find credential file, quit" && exit -1
fi

ssh ${DEST_HOST} "ls ${DEST_SCRIPT_PATH}" &> /dev/null && echo "--> SSH to remote Openstack ok" || echo "Please check the remote Openstack's ssh connection, and make sure ${DEST_SCRIPT_PATH} exists on that server" 

#---------------<SOURCE>---------------

SRC_INSTANCE_ID=`nova list | grep -w ${1} | awk -F'|' '{ print $2 }'`
if [ -z "${SRC_INSTANCE_ID}" ]; then 
	echo "Instance $1 not found in Openstack, quit" && exit -1 	
fi

SRC_VOLUME_ID=`cinder list | grep -w ${SRC_INSTANCE_ID} | awk -F'|' '{ print $2 }' | awk -F' ' '{ print $1 }'`
if [ -z "${SRC_VOLUME_ID}" ]; then 
	echo "Instance ${SRC_INSTANCE_ID} has no associate volume, quit" && exit -1 	
fi

nova delete ${SRC_INSTANCE_ID} && sleep 10

SRC_VOLUME_STATUS=`cinder list | grep -w ${SRC_VOLUME_ID} | awk -F'|' '{ print $3 }' | awk -F' ' '{ print $1 }'`
while [ "${SRC_VOLUME_STATUS}" != "available" ];do
	echo "--> Waiting for vm down ..." && sleep 10
  	SRC_VOLUME_STATUS=`cinder list | grep -w ${SRC_VOLUME_ID} | awk -F'|' '{ print $3 }'`
done

chown cinder.cinder ${CINDER_VOLUME_LOCATION}${SRC_VOLUME_ID} 
echo "--> Create cinder backup:"
cinder backup-create ${SRC_VOLUME_ID}	

########################################################################################

#SRC_INSTANCE_STATE=`nova list | grep -w ${1} | awk -F'|' '{ print $4 }'`
 
#if [ "${SRC_INSTANCE_STATE}" != " SHUTOFF " ]; then
#	nova stop ${SRC_INSTANCE_ID}
#	echo "Waiting for vm down ..." && sleep 10
#fi

#SRC_INSTANCE_STATE=`nova list | grep -w ${1} | awk -F'|' '{ print $4 }'`
#while [ "${SRC_INSTANCE_STATE}" != " SHUTOFF " ] ;do
#        echo "Waiting for vm down ..." && sleep 10
#        SRC_INSTANCE_STATE=`nova list | grep -w ${1} | awk -F'|' '{ print $4 }'`
#done

#####nova volume-detach ${SRC_INSTANCE_ID} ${SRC_VOLUME_ID} 

#chown cinder.cinder ${CINDER_VOLUME_LOCATION}${SRC_VOLUME_ID} 
#cinder backup-create --force ${SRC_VOLUME_ID}	

########################################################################################



SRC_VOLUME_BACKUP_STATUS=`cinder backup-list | grep ${SRC_VOLUME_ID} | awk -F'|' '{ print $4 }' | awk -F' ' '{ print $1 }'`
if [ "${SRC_VOLUME_BACKUP_STATUS}" == "error" ];then
	echo "Something wrong with the creation, please check /var/log/cinder/backup.log and remove the error backup" && exit -1
fi
while [ "${SRC_VOLUME_BACKUP_STATUS}" == "creating" ];do
        echo "--> Creating Backup Volume ..." && sleep 30
	SRC_VOLUME_BACKUP_STATUS=`cinder backup-list | grep ${SRC_VOLUME_ID} | awk -F'|' '{ print $4 }' | awk -F' ' '{ print $1 }'`
done
if [ "${SRC_VOLUME_BACKUP_STATUS}" == "available" ];then
	echo "--> Backup Created"
else
	echo "Please run # cinder backup-list and check the backup's status" && exit -1  
fi

METADATA_PATH=${METADATA_LOCATION}${SRC_VOLUME_ID}

SRC_VOLUME_BACKUP_ID=`cinder backup-list | grep ${SRC_VOLUME_ID} | awk -F'|' '{ print $2 }'`
SRC_VOLUME_BACKUP_SIZE=`cinder backup-list | grep ${SRC_VOLUME_ID} | awk -F'|' '{ print $6 }' | awk -F' ' '{ print $1}'`
cinder backup-export ${SRC_VOLUME_BACKUP_ID} | sed -n '/backup_url/,$ s/|.*|  *\(.*\) |/\1/p' > ${METADATA_PATH}
echo "--> Copy metadata to remote host:"
scp ${METADATA_PATH} ${DEST_HOST}:${METADATA_PATH}
echo "--> Launch Remote Side Script:"
ssh ${DEST_HOST} "bash ${DEST_SCRIPT_PATH} ${SRC_VOLUME_ID} ${SRC_VOLUME_BACKUP_SIZE} ${SRC_VOLUME_BACKUP_ID}"
