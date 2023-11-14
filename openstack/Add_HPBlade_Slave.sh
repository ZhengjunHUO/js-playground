#!/bin/bash
# Name: Add_HPBlade_Slave
# Description: Add a hp blade as a compute node 
# Author: HUO Zhengjun
# Version: 1.0.0
# Date: 11/07/2016

# For colorful output use:
RED='\033[31m'  
GREEN='\033[32m'
BLUE='\033[36m'
END='\033[0m'

SLAVE_NAME=				# computeN

#SLAVE_IP_ILO=				# 10.0.200.?
#ILO_LOGIN=openstack_fence
#ILO_PWD=
#ILO_ACTION=off

SLAVE_IP_IDRAC=				# 10.0.200.?
IDRAC_LOGIN=openstack_fence
IDRAC_PWD=
IDRAC_ACTION=off

pcs resource create $SLAVE_NAME ocf:pacemaker:remote reconnect_interval=60 op monitor interval=20
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to create remote resource " && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tCreate remote resource Success"

pcs property set --node $SLAVE_NAME osprole=compute
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to change remote resource's property" && exit -1 

pcs stonith create shoot_${SLAVE_NAME} fence_ipmilan ipaddr=$SLAVE_IP_IDRAC auth=password login=$IDRAC_LOGIN passwd=$IDRAC_PWD lanplus=1 action=$IDRAC_ACTION pcmk_host_list=$SLAVE_NAME op monitor interval=60s
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to create remote stonith " && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tCreate remote stonith Success"

#pcs stonith create shoot_${SLAVE_NAME} fence_ilo2 ipaddr=$SLAVE_IP_ILO login=$ILO_LOGIN passwd=$ILO_PWD action=$ILO_ACTION pcmk_host_list=$SLAVE_NAME ssl_insecure=1 op monitor interval=60s
#[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to create remote stonith " && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tCreate remote stonith Success"

pcs stonith level add 1 $SLAVE_NAME shoot_${SLAVE_NAME},fence-nova
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to create stonith level" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tAll done for $SLAVE_NAME"

ssh $SLAVE_NAME "systemctl start neutron-linuxbridge-agent libvirtd openstack-ceilometer-compute openstack-nova-compute"

