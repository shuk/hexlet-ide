# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.define 'default' do |item|
    item.vm.box = 'ubuntu/trusty64'

    item.vm.network 'private_network', type: 'dhcp' # NOTE: nfs
    item.vm.synced_folder '.', '/vagrant', type: 'nfs'

    item.vm.network 'forwarded_port', guest: 9000, host: 9000

    item.ssh.forward_agent = true

    item.vm.provision 'docker', version: '1.3.2'

    item.vm.provision 'ansible' do |ansible|
      ansible.playbook = 'cm/vagrant.yml'
      ansible.tags = ENV['TAGS']
      ansible.sudo = true
      ansible.verbose = 'vv'
    end

    item.vm.provider 'virtualbox' do |v, override|
      override.vm.box = 'ubuntu/trusty64'
      v.memory = 1024
      v.cpus = 1
    end
  end
end
