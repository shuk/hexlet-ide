# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = '2'

ansible_script = <<SCRIPT
  git clone https://github.com/mokevnin/dotfiles.git /var/tmp/dotfiles
  cd /var/tmp/dotfiles
  git pull -f
  make
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.define 'default' do |item|
    item.vm.box = 'ubuntu/trusty64'

    # item.vm.network 'private_network', type: 'dhcp' # NOTE: nfs
    # item.vm.synced_folder '.', '/vagrant', type: 'nfs'

    item.vm.network 'forwarded_port', guest: 80, host: 8081
    item.vm.network 'forwarded_port', guest: 3000, host: 3000
    item.vm.network 'forwarded_port', guest: 9000, host: 9000

    item.ssh.forward_agent = true

    # item.vm.provision 'docker', version: '1.3.0'

    # item.vm.provision 'ansible' do |ansible|
    #   ansible.playbook = 'cm/vagrant.yml'
    #   ansible.tags = ENV['TAGS']
    #   ansible.sudo = true
    #   ansible.verbose = 'vv'
    # end

    # item.vm.provision 'shell', inline: ansible_script,
    #   privileged: false

    item.vm.provider 'virtualbox' do |v, override|
      override.vm.box = 'ubuntu/trusty64'
      v.memory = 2048
      v.cpus = 4
    end
  end
end
