# stolen from http://github.com/tekkub/github-gem
# todo: delete file and post again if filename already taken 

require "net/http"
require 'net/https'
require 'xmlsimple'
require 'mime/types'

def github_upload(filename, user, repo)
  raise "Specify a file to upload" if filename.nil?
  raise "Cannot determine GitHub repo" if user.nil? || repo.nil?
  raise "Target file does not exist" unless File.size?(filename)
  file = File.new(filename)
  mime_type = MIME::Types.type_for(filename)[0] || MIME::Types["application/octet-stream"][0]
 
  res = http_post("http://github.com/#{user}/#{repo}/downloads", {
    :file_size => File.size(filename),
    :content_type => mime_type.simplified,
    :file_name => filename,
    :description => '',
    :login => github_user,
    :token => github_token,
  })
  
  raise "File #{filename} exist, remove it manaully please" if res.class == Net::HTTPConflict
  raise "Repo not found" if res.class == Net::HTTPNotFound
  data = XmlSimple.xml_in(res.body)
  raise "Unable to authorize upload" if data["signature"].nil?
 
  res = http_post_multipart("http://github.s3.amazonaws.com/", {
    :key => "#{data["prefix"].first}#{filename}",
    :Filename => filename,
    :policy => data["policy"].first,
    :AWSAccessKeyId => data["accesskeyid"].first,
    :signature => data["signature"].first,
    :acl => data["acl"].first,
    :file => file,
    :success_action_status => 201
  })
  raise "File #{filename} upload failed" unless res.class == Net::HTTPCreated
  puts "File #{filename} uploaded successfully"
end

def github_user
  git("config --get github.user")
end

def git(command)
  `git #{command}`.strip
end

def github_token
  git("config --get github.token")
end

def http_get(url)
  parsed_url = URI.parse(url)
  http = Net::HTTP.new(parsed_url.host, parsed_url.port)
  http.use_ssl = parsed_url.scheme == 'https'
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  http.get(parsed_url.request_uri)
end

def http_post(url,params)
  parsed_url = URI.parse(url)
  http = Net::HTTP.new(parsed_url.host, parsed_url.port)
  http.use_ssl = parsed_url.scheme == 'https'
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
 
  req = Net::HTTP::Post.new(parsed_url.path)
  req.body = params.map {|k,v| "#{url_encode(k)}=#{url_encode(v)}" }.join('&')
  req.content_type = 'application/x-www-form-urlencoded'
  http.request req
end

def http_post_multipart(url, params)
  parsed_url = URI.parse(url)
  http = Net::HTTP.new(parsed_url.host, parsed_url.port)
  http.use_ssl = parsed_url.scheme == 'https'
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
 
  boundary = "#{rand(1000000)}boundaryofdoomydoom#{rand(1000000)}"
 
  fp = []
  files = []
 
  params.each do |k,v|
    if v.respond_to?(:path) and v.respond_to?(:read) then
      filename = v.path
      content = v.read
      mime_type = MIME::Types.type_for(filename)[0] || MIME::Types["application/octet-stream"][0]
      fp.push(prepare_param("Content-Type", mime_type.simplified))
      files.push("Content-Disposition: form-data; name=\"#{url_encode(k.to_s)}\"; filename=\"#{ filename }\"\r\nContent-Type: #{ mime_type.simplified }\r\n\r\n#{ content }\r\n")
    else
      fp.push(prepare_param(k,v))
    end
  end
 
  http.post(parsed_url.path, "--#{boundary}\r\n" + (fp + files).join("--#{boundary}\r\n") + "--#{boundary}--", {
    "Content-Type" => "multipart/form-data; boundary=#{boundary}",
    "User-Agent" => "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/523.10.6 (KHTML, like Gecko) Version/3.0.4 Safari/523.10.6"
  })
end

def prepare_param(name, value)
  "Content-Disposition: form-data; name=\"#{url_encode(name)}\"\r\n\r\n#{value}\r\n"
end

def url_encode(str)
  str.to_s.gsub(/[^a-zA-Z0-9_\.\-]/n) {|s| sprintf('%%%02x', s[0])}
end