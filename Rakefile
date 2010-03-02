require 'rubygems'
require 'rake'

APP_NAME = 'Murmur.air'

task :test do
  `adl spec.xml`
end

task :run do
  `adl application.xml`
end

task :build do
  included = %w{application.xml app config index.html lib vendor images css}
  puts "Please enter keystore password:"
  `adt -package -storetype pkcs12 -keystore cert.p12 #{APP_NAME} #{included.join(' ')}`
end

task :deploy => :build do
  dropbox = "~/Dropbox/Public/murmur"
  `mv #{APP_NAME} #{dropbox}`
  `cp update.xml #{dropbox}`
end

task :default => [:run]