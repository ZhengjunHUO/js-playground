#!/bin/bash
# Name: Slave_HA.sh
# Description: Openstack Liberty: Full HA installation of a compute node.
# Author: HUO Zhengjun
# Version: 1.1.0
# Date: 27/06/2016

RED='\033[31m'
GREEN='\033[32m'
BLUE='\033[36m'
END='\033[0m' 


#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#                          !!!ATTENTION!!!                                  #
# BEFORE LAUNCH THE SCRIPT:                                                 #
#     1.MAKE SURE THE ACCESS TO INTERNET IS AVAILABLE                       #
#     2.CONFIG THE HOSTNAME AND RELOGIN TO ACTIVE IT                        # 
#     3.VERIFY THE FOLLOWING /etc/hosts CONFIGURATION                       #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#


if ! grep "controller" /etc/hosts &> /dev/null; then
cat << EOF >> /etc/hosts
10.0.0.100   controller                                                
10.0.0.15    controller1                                               
10.0.0.16    controller2                                              
10.0.0.17    controller3                                                
10.0.0.18    controller4                                                
10.0.0.19    controller5                                                
10.0.0.21    compute1                                                   
10.0.0.22    compute2                                                   
10.0.0.23    compute3 
10.0.0.24    compute4
10.0.0.25    compute5
EOF
fi

#!!!ATTENTION!!!
#Fill in "MY_IP" and "PUBLIC_INTERFACE_NAME" before launch

MASTER_HOSTNAME=controller 	# master's name
MASTER_HOSTNAME_PUB=		# URL
MY_IP=				# my ip

CONTROLLER1_NAME=controller1
CONTROLLER2_NAME=controller2
CONTROLLER3_NAME=controller3
CONTROLLER4_NAME=controller4
CONTROLLER5_NAME=controller5

PROJECT_DOMAIN=default 		
USER_DOMAIN=default

PASSWD_RABBITMQ=		# Password of user guest of RabbitMQ
USER_RABBITMQ=			# A user guest of RabbitMQ

NOVA_PWD=			# Password of Compute service user nova
NEUTRON_PWD=			# Password of Networking service user neutron
CELO_PWD=

PUBLIC_INTERFACE_NAME=em1 	# The interface configured for a public network

FILEPATH=`dirname $0`

MEMCACHE_SERVERLIST="$CONTROLLER1_NAME:11211,$CONTROLLER2_NAME:11211,$CONTROLLER3_NAME:11211,$CONTROLLER4_NAME:11211,$CONTROLLER5_NAME:11211"

RABBIT_SERVERLIST="$CONTROLLER1_NAME:5672,$CONTROLLER2_NAME:5672,$CONTROLLER3_NAME:5672,$CONTROLLER4_NAME:5672,$CONTROLLER5_NAME:5672"

NOVA_NFS_JONC="10.0.0.211:/stack_compute_NFS_volume"



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#                Base               #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# 0
# Test
if [ ! -e $FILEPATH/compute_ssh/ ]; then
	echo -e "[${RED}FAILED${END}]\tPlease make sure you have a directory named ${RED}compute_ssh/${END} with this script" && exit -1
fi

if [ ! -e $FILEPATH/compute_nova_ssh/ ]; then
	echo -e "[${RED}FAILED${END}]\tPlease make sure you have a directory named ${RED}compute_nova_ssh/${END} with this script" && exit -1
fi

if [ ! -e $FILEPATH/authkey ]; then
	echo -e "[${RED}FAILED${END}]\tPlease make sure you have a file named ${RED}authkey${END} with this script" && exit -1
fi

if [ ! -e $FILEPATH/compute_ssh/ ]; then
  echo -e "[${RED}FAILED${END}]\tPlease make sure you have a directory named ${RED}compute_ssh/${END} with this script" && exit -1
else
  mkdir -p /root/.ssh
  [ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to make .ssh." && exit -1
  rm -f /root/.ssh/*
  cp -n --preserve=all $FILEPATH/compute_ssh/* /root/.ssh/
  [ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to copy ssh files." && exit -1
  chown root:root /root/.ssh/*
  [ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to change ownership of ssh files." && exit -1
fi

if [ ! -e $FILEPATH/compute_nova_ssh/ ]; then
  echo -e "[${RED}FAILED${END}]\tPlease make sure you have a directory named ${RED}compute_nova_ssh/${END} with this script" && exit -1
fi

# 1
# Make sure the configuration yum and the access to Internet
yum repolist &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tPlease configure the network and the yum repo source." && exit -1 

# Install the package to enable the OpenStack repository
echo -e "${BLUE}Yum Installing, please wait ......${END}"
yum -y install chrony centos-release-openstack-liberty &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tInstall Centos-release-openstack-liberty Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tInstall Centos-release-openstack-liberty Success"

systemctl enable chronyd.service &> /dev/null
systemctl start chronyd.service
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to start chronyd service" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tStart chronyd service Success"

# 2
# Upgrade the packages on your host
echo -e "${BLUE}Yum Upgrading, this will take a while, please wait ......${END}"
yum -y upgrade &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpgrade packet Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tUpgrade packet Success"

# 3
# Install the OpenStack client and openstack-selinux package to automatically manage security policies for OpenStack services
echo -e "${BLUE}Yum Installing, please wait ......${END}"
yum -y install python-openstackclient openstack-selinux &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tInstall python-openstackclient/openstack-selinux Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tInstall python-openstackclient/openstack-selinux Success"

# 4
setenforce 0
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to disable selinux" && exit -1
sed -i "s/SELINUX=enforcing/SELINUX=permissive/" /etc/selinux/config
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to modify selinux config file" && exit -1



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#          Compute Service          #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# 1
# Install Nova package
echo -e "${BLUE}Yum Installing, please wait ......${END}"
yum -y install openstack-nova-compute sysfsutils qemu-kvm qemu-img virt-manager libvirt libvirt-python python-virtinst libvirt-client nfs-utils rpcbind &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tYum install Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tYum install Success"

systemctl start rpcbind
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tStart rpcbind Failed" && exit -1 
systemctl enable rpcbind &> null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tEnable rpcbind Failed" && exit -1 

# 2
# Configuration of nova service 
if [ `egrep -c '(vmx|svm)' /proc/cpuinfo` -eq 0 ]; then
	QEMU_OR_KVM="virt_type = qemu"
else
	QEMU_OR_KVM="virt_type = kvm"
fi

if [ -e /etc/nova/nova.conf ]; then
	mv -f /etc/nova/nova.conf /etc/nova/nova.conf.bak 
fi
cat << EOF > /etc/nova/nova.conf 
[DEFAULT]
my_ip=$MY_IP
auth_strategy=keystone
network_api_class=nova.network.neutronv2.api.API
linuxnet_interface_driver=nova.network.linux_net.NeutronLinuxBridgeInterfaceDriver
security_group_api=neutron
firewall_driver=nova.virt.firewall.NoopFirewallDriver
rpc_backend=rabbit
compute_driver = libvirt.LibvirtDriver
scheduler_default_filters=AllHostsFilter
allow_migrate_to_same_host = True
allow_resize_to_same_host = True	
    
instance_usage_audit = True
instance_usage_audit_period = hour
notify_on_state_change = vm_and_task_state
notification_driver = messagingv2

memcached_servers = $MEMCACHE_SERVERLIST

[api_database]

[barbican]

[cells]

[cinder]

[conductor]

[cors]

[cors.subdomain]

[database]

[ephemeral_storage_encryption]

[glance]
host=$MASTER_HOSTNAME

[guestfs]

[hyperv]

[image_file_url]

[ironic]

[keymgr]

[keystone_authtoken]
auth_uri=http://$MASTER_HOSTNAME:5000
auth_url=http://$MASTER_HOSTNAME:35357
auth_plugin = password
project_domain_id = $PROJECT_DOMAIN
user_domain_id = $USER_DOMAIN
project_name = service 
username = nova
password = $NOVA_PWD
memcached_servers = $MEMCACHE_SERVERLIST

[libvirt]
$QEMU_OR_KVM
cpu_mode=custom
cpu_model=Westmere

[matchmaker_redis]

[matchmaker_ring]

[metrics]

[neutron]
url=http://$MASTER_HOSTNAME:9696
auth_url=http://$MASTER_HOSTNAME:35357
auth_plugin = password
project_domain_id = $PROJECT_DOMAIN
user_domain_id = $USER_DOMAIN
region_name = RegionOne
project_name = service 
username = neutron
password = $NEUTRON_PWD
memcached_servers = $MEMCACHE_SERVERLIST

[osapi_v21]

[oslo_concurrency]
lock_path=/var/lib/nova/tmp

[oslo_messaging_amqp]

[oslo_messaging_qpid]

[oslo_messaging_rabbit]
rabbit_hosts=$RABBIT_SERVERLIST
rabbit_userid=$USER_RABBITMQ
rabbit_password=$PASSWD_RABBITMQ
rabbit_retry_interval=1
rabbit_retry_backoff=2
rabbit_max_retries=0
rabbit_ha_queues=true

[oslo_middleware]

[rdp]

[serial_console]

[spice]

[ssl]

[trusted_computing]

[upgrade_levels]

[vmware]

[vnc]
novncproxy_base_url=https://$MASTER_HOSTNAME_PUB:6080/vnc_auto.html
vncserver_listen=0.0.0.0
vncserver_proxyclient_address=\$my_ip
enabled=True

[workarounds]

[xenserver]

[zookeeper]

EOF

[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tNova Configuration Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tNova Config File Created"

if ! grep "$NOVA_NFS_JONC" /etc/fstab &> /dev/null; then
	echo "$NOVA_NFS_JONC	/var/lib/nova/instances/ nfs	lookupcache=none,rsize=8192,wsize=8192,timeo=14,intr,vers=3" >> /etc/fstab
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tModify fstab for nova compute Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tModify fstab for nova compute Success"
fi
mount -a 
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tProblem occurred when make the mount" && exit -1 
chown nova:nova /var/lib/nova/instances/
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to chown on nova nfs disk" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tchown on nova nfs disk success"

# 3
usermod -s /bin/bash nova
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to change user nova's shell" && exit -1 

mkdir -p /var/lib/nova/.ssh
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to make .ssh." && exit -1
rm -f /var/lib/nova/.ssh/*
cp -n --preserve=all $FILEPATH/compute_nova_ssh/* /var/lib/nova/.ssh/
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to copy ssh files." && exit -1
chown nova:nova /var/lib/nova/.ssh/*
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to change ownership of ssh files." && exit -1

# 4
# Active and start nova services 
systemctl enable libvirtd.service openstack-nova-compute.service &> /dev/null
#systemctl start libvirtd.service openstack-nova-compute.service
#[ $? -ne 0 ] && echo -e "[  ${RED}FAILED${END}  ]\tStart Nova Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tStart Nova Success"



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#            Network Service        #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# 1
# Install neutron package
echo -e "${BLUE}Yum Installing, please wait ......${END}"
yum -y install openstack-neutron openstack-neutron-linuxbridge ebtables ipset &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tYum install Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tYum install Success"

# 2
# Configure neutron service 
if [ -e /etc/neutron/neutron.conf ]; then
	mv -f /etc/neutron/neutron.conf /etc/neutron/neutron.conf.bak 
fi
cat << EOF > /etc/neutron/neutron.conf 
[DEFAULT]
auth_strategy = keystone
rpc_backend=rabbit

[matchmaker_redis]

[matchmaker_ring]

[quotas]

[agent]

[keystone_authtoken]
auth_uri=http://$MASTER_HOSTNAME:5000
auth_url=http://$MASTER_HOSTNAME:35357
auth_plugin = password
project_domain_id = $PROJECT_DOMAIN
user_domain_id = $USER_DOMAIN
project_name = service 
username = neutron
password = $NEUTRON_PWD
memcached_servers = $MEMCACHE_SERVERLIST

[database]

[nova]

[oslo_concurrency]
lock_path = /var/lib/neutron/tmp

[oslo_policy]

[oslo_messaging_amqp]

[oslo_messaging_qpid]

[oslo_messaging_rabbit]
rabbit_hosts=$RABBIT_SERVERLIST
rabbit_userid=$USER_RABBITMQ
rabbit_password=$PASSWD_RABBITMQ
rabbit_retry_interval=1
rabbit_retry_backoff=2
rabbit_max_retries=0
rabbit_ha_queues=true

[qos]

EOF

[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tNeutron Configuration Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tNeutron Config File Created"

# 3
# Configure the Linux bridge agent
if [ -e /etc/neutron/plugins/ml2/linuxbridge_agent.ini   ]; then
	mv -f /etc/neutron/plugins/ml2/linuxbridge_agent.ini /etc/neutron/plugins/ml2/linuxbridge_agent.ini.bak 
fi
cat << EOF > /etc/neutron/plugins/ml2/linuxbridge_agent.ini   
[linux_bridge]
physical_interface_mappings = public:$PUBLIC_INTERFACE_NAME

[vxlan]
enable_vxlan = True
local_ip = $MY_IP
l2_population = True

[agent]
prevent_arp_spoofing = True

[securitygroup]
enable_security_group = True
firewall_driver = neutron.agent.linux.iptables_firewall.IptablesFirewallDriver

EOF

[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tNeutron Bridge Agent Configuration Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tNeutron Bridge Agent Config File Created"

# 4
# Active and start neutron services 
systemctl enable neutron-linuxbridge-agent.service &> /dev/null 
#systemctl start neutron-linuxbridge-agent.service
#[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tStart Bridge Agent Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tStart Bridge Agent Success"



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#           LVM Configuration       #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# 1
# Configure the libvirtd service to enable live-migration
if [ `netstat -nap | grep 16509 | wc -l` -eq 0 ]; then
	echo -e "${BLUE}Configure the libvirtd service...${END}"
    sed -i '/#listen_tls/a \listen_tls = 0' /etc/libvirt/libvirtd.conf
    sed -i '/#listen_tcp/a \listen_tcp = 1' /etc/libvirt/libvirtd.conf
    sed -i '/#tcp_port/a \tcp_port = "16509"' /etc/libvirt/libvirtd.conf
    sed -i '/#listen_addr/a \listen_addr = "0.0.0.0"' /etc/libvirt/libvirtd.conf
    sed -i '/#auth_tcp/a \auth_tcp = "none"' /etc/libvirt/libvirtd.conf

    sed -i '/#LIBVIRTD_ARGS/a \LIBVIRTD_ARGS = "--listen"' /etc/sysconfig/libvirtd

	#systemctl restart libvirtd.service
	#[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tRestart libvirtd Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tRestart libvirtd Success"
fi



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#              Ceilometer           #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# 1
echo -e "${BLUE}Yum Installing, please wait ......${END}"
yum -y install openstack-ceilometer-compute python-ceilometerclient python-pecan &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tInstall Ceilometer Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tInstall Ceilometer Success"

# 2
if [ -e /etc/ceilometer/ceilometer.conf ]; then
  mv -f /etc/ceilometer/ceilometer.conf /etc/ceilometer/ceilometer.conf.bak
fi

cat << EOF > /etc/ceilometer/ceilometer.conf
[DEFAULT]
rpc_backend = rabbit
auth_strategy = keystone

[alarm]

[api]

[central]

[collector]

[compute]

[coordination]

[database]

[dispatcher_file]

[event]

[exchange_control]

[hardware]

[ipmi]

[keystone_authtoken]
auth_uri = http://$MASTER_HOSTNAME:5000
auth_url = http://$MASTER_HOSTNAME:35357
auth_plugin = password
project_domain_id = $PROJECT_DOMAIN
user_domain_id = $USER_DOMAIN
project_name = service
username = ceilometer
password = $CELO_PWD
memcached_servers = $MEMCACHE_SERVERLIST

[matchmaker_redis]

[matchmaker_ring]

[meter]

[notification]

[oslo_concurrency]

[oslo_messaging_amqp]

[oslo_messaging_qpid]

[oslo_messaging_rabbit]
rabbit_hosts=$RABBIT_SERVERLIST
rabbit_userid=$USER_RABBITMQ
rabbit_password=$PASSWD_RABBITMQ
rabbit_retry_interval=1
rabbit_retry_backoff=2
rabbit_max_retries=0
rabbit_ha_queues=true

[oslo_policy]

[polling]

[publisher]

[publisher_notifier]

[publisher_rpc]

[rgw_admin_credentials]

[service_credentials]
os_auth_url = http://$MASTER_HOSTNAME:5000/v2.0
os_username = ceilometer
os_tenant_name = service
os_password = $CELO_PWD
os_endpoint_type = internalURL
os_region_name = RegionOne

[service_types]

[vmware]

[xenapi]


EOF

[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tCeilometer Configuration Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tCeilometer Config File Created"

# 3
systemctl enable openstack-ceilometer-compute.service &> /dev/null
#systemctl start openstack-ceilometer-compute.service
#[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tStart Ceilometer Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tStart Ceilometer Success"



#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#
#        Cluster Configuration      #
#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#

# 1
echo -e "${BLUE}Yum Installing, please wait ......${END}"
yum install -y pacemaker-remote resource-agents fence-agents-all pcs &> /dev/null
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tYum install Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tYum install Success"

# 2
mkdir -p --mode=0750 /etc/pacemaker
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tCreate /etc/pacemaker Failed" && exit -1

chgrp haclient /etc/pacemaker
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tChange group for /etc/pacemaker Failed" && exit -1

cp -n --preserve=all $FILEPATH/authkey /etc/pacemaker
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tCopy authkey Failed" && exit -1

# 3
systemctl enable pacemaker_remote &> /dev/null
systemctl start pacemaker_remote
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tStart pacemaker_remote Failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tStart pacemaker_remote Success"

# 4
# Chronyd
if ! grep "server controller" /etc/chrony.conf; then
	sed -i "s/^server 0/#server 0/" /etc/chrony.conf
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1
	sed -i "s/^server 1/#server 1/" /etc/chrony.conf
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1
	sed -i "s/^server 2/#server 2/" /etc/chrony.conf
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1
	sed -i "s/^server 3/#server 3/" /etc/chrony.conf
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1
	echo "server controller1 iburst" >> /etc/chrony.conf
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1
	echo "server controller2 iburst" >> /etc/chrony.conf	
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1
	echo "server controller3 iburst" >> /etc/chrony.conf
	[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tUpdate chronyd.conf failed" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tUpdate chronyd.conf Success"
fi
systemctl restart chronyd.service
[ $? -ne 0 ] && echo -e "[${RED}FAILED${END}]\tFailed to restart chronyd service" && exit -1 || echo -e "[  ${GREEN}OK${END}  ]\tRestart chronyd service Success"



echo -e "${BLUE}#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@${END}"
echo -e "${BLUE}#@                                                                    @${END}"
echo -e "${BLUE}#@                              ALL DONE                              @${END}"
echo -e "${BLUE}#@                                                                    @${END}"
echo -e "${BLUE}#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@${END}"




