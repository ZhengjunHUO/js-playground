#!/bin/bash
# Name: remove_error_volume.sh
# Description: Remove error volume directly in db (Openstack Liberty)
# Author: HUO Zhengjun
# Version: 1.0.0
# Date: 10/11/2016
#

if [ $# -ne 1 ];then 	
	echo "Usage $0 <VOLUME_ID>" && exit -1; 
fi

#mysql -u root -p"?Seedbox77310?" -e "select * from cinder.volume_attachment where volume_id='$1'\G"
mysql -u root -p"?Seedbox77310?" -e "update cinder.volume_attachment set deleted_at=now(),deleted=1,detach_time=now(),attach_status='detached' where volume_id='$1';"
[ $? -ne 0 ] && echo -e "Update cinder.volume_attachment Failed" && exit -1 

mysql -u root -p"?Seedbox77310?" -e "update cinder.volumes set deleted_at=now(),deleted=1,status='deleted',attach_status='detached',terminated_at=now() where id='$1';"
[ $? -ne 0 ] && echo -e "Update cinder.volumes Failed" && exit -1 

echo "[INFO] Update db success. Please recalculate the volume number and total disk usage in cinder.quota_usages manually."

echo "Try to find disk under /var/lib/cinder/mnt/ ..."
DISK_PATH=`find /var/lib/cinder/mnt/ -name "volume-a852b2e9-9665-4a8e-ae00-102dd9179a4f" | grep -v ".snapshot"`
if [ -z "${DISK_PATH}" ]; then
	echo "[ERROR] Volume Not Found, check if disk netapp is mounted on this controller"
else
	echo "[INFO] Remove ${DISK_PATH}"
	rm -f ${DISK_PATH}
fi
